import path from 'path';
import Arborist from '@npmcli/arborist';
import createDebug from 'debug';

const logger = createDebug('pi-core:generate-report');

import { IArboristEdge, IArboristNode, ServerPlugin } from '../types';
import {
  getDirectorySize,
  getLatestPackages,
  stripPathOnDisk,
} from '../package';

import { Package, Report, Suggestion } from '../models';

function getValues(dependencyTree: IArboristNode) {
  // ignore the root node
  return [...dependencyTree.inventory.values()].filter(
    (node) => !node.isProjectRoot
  );
}

function processPlugins(plugins: string[]): ServerPlugin[] {
  const processedPlugins: ServerPlugin[] = [];

  plugins.forEach((pluginPath) => {
    // FIXME: need to have a try catch for this
    // FIXME: we need to have a test for this code, easily breakable
    const ServerPlugin = require(`${pluginPath}/server`)?.default;

    if (ServerPlugin) {
      processedPlugins.push(new ServerPlugin());
    }
  });

  return processedPlugins;
}

interface GenerateReportArgs {
  plugins?: string[];
}

export async function generateReport(
  cwd: string,
  options?: GenerateReportArgs
): Promise<Report> {
  let processedPlugins: ServerPlugin[] = [];

  if (options?.plugins) {
    processedPlugins = processPlugins(options.plugins);
  }

  const report = new Report();

  const arb = new Arborist({
    path: cwd,
  });

  const rootArboristNode: IArboristNode = await arb.loadActual();

  // Exploring the dependency graph via BFS
  const depNodeMap = new Map<string, Package>();
  const edgeQueue: IArboristEdge[] = [...rootArboristNode.edgesOut.values()];
  const visited = new Set<string>();

  while (edgeQueue.length > 0) {
    const { to: node, type } = edgeQueue.shift()!; // will always have a value given our while loop condition.

    // TODO: `to` may possible be empty, in the case of a `peer` or `optional` dependency, may be able to determine this by the type of the edge.
    // TODO: update the arborist type to make to optional based on the above comment

    const lookupKey = `${node.name}@${node.version}`;

    if (visited.has(lookupKey)) {
      logger(`Skipping node: ${lookupKey}`);

      const existingNode = depNodeMap.get(lookupKey);

      if (existingNode) {
        existingNode.addPath(node.path);

        if (existingNode.type !== type) {
          // This is a case where we already processed the dependency, but the type is different than the original type.
          // This can happen if two packages depend on this package, but the type is different (i.e. peer vs optional vs prod).
          // TODO: we need to handle "upleveling" of the type, i.e. dev -> optional -> peer -> prod.
          logger(
            `Type mismatch for node: ${lookupKey} -- Existing: ${existingNode?.type} -- Current: ${type}`
          );
        }
      }

      continue;
    }

    logger(`Exploring node: ${lookupKey}`);

    const pkg = new Package({
      name: node.name,
      path: node.path,
      rootPath: cwd,
      version: node.version,
      funding: node.funding,
      homepage: node.homepage,
      type: type,
    });

    for (const edgeOut of node.edgesOut.values()) {
      // Add edge destinations to the queue.
      edgeQueue.push(edgeOut);

      // Add the edge's dependency to the package.
      pkg.addDependency(`${edgeOut.to.name}@${edgeOut.to.version}`);
    }

    // Add this node to the visited set.
    visited.add(lookupKey);
    depNodeMap.set(lookupKey, pkg);
  }

  const arboristValues = getValues(rootArboristNode);

  // TODO: refactor this as well.
  const latestPackagesMap = await getLatestPackages(arboristValues);

  Object.keys(latestPackagesMap).forEach((packageName) => {
    report.latestPackages[packageName] = latestPackagesMap[packageName];
  });

  arboristValues.forEach((depNode) => {
    const edge = [...depNode.edgesIn.values()].find((edgeIn) => {
      return edgeIn.name === depNode.name;
    });

    const lookupKey = `${depNode.name}@${depNode.version}`;

    if (!report.dependencies[lookupKey]) {
      report.dependencies[lookupKey] = {
        funding: depNode.funding,
        homepage: depNode.homepage,
        name: depNode.name,
        version: depNode.version,
        type: edge?.type || (depNode.isWorkspace ? 'workspace' : undefined),
        metadata: {
          size: getDirectorySize({
            directory: depNode.path,
            exclude: new RegExp(path.resolve(depNode.path, 'node_modules')),
          }),
          pathsOnDisk: [],
        },
        dependencies: [...depNode.edgesOut.values()]
          .filter((dependency) => {
            const node = dependency.to;

            // We don't have a node when it is optional or a peer
            // At this point we don't count those as they are counted as a part of the package that brings them in
            return node;
          })
          .map((dependency) => {
            const node = dependency.to;

            return `${node.name}@${node.version}`;
          }),
      };
    }

    // always push the path of the depNode, everything is taken care of by the setup code.
    report.dependencies[lookupKey].metadata?.pathsOnDisk.push(
      stripPathOnDisk(depNode.path, cwd)
    );
  });

  report.root = {
    name: rootArboristNode.packageName,
    version: rootArboristNode.version,
    funding: rootArboristNode.funding,
    homepage: rootArboristNode.homepage,
    metadata: {
      pathsOnDisk: [stripPathOnDisk(rootArboristNode.path, cwd)],
    },
    dependencies: [...rootArboristNode.edgesOut.values()]
      .filter((dependencyEdge) => {
        const dependencyNode = dependencyEdge.to;

        // We don't have a node when it is optional or a peer
        // At this point we don't count those as they are counted as a part of the package that brings them in
        return dependencyNode;
      })
      .map((dependencyEdge) => {
        const dependencyNode = dependencyEdge.to;

        return `${dependencyNode.name}@${dependencyNode.version}`;
      }),
  };

  const suggestionInput = { arboristValues, rootArboristNode };

  for (const plugin of processedPlugins) {
    if (plugin.getSuggestions) {
      const suggestions = await plugin?.getSuggestions(suggestionInput);

      report.suggestions.push(...suggestions);
    }
  }

  return report;
}
