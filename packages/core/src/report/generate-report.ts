import Arborist from '@npmcli/arborist';
import fs from 'fs-extra';
import path from 'path';

import { Report } from '../models';
import {
  formatDuration,
  getDirectorySize,
  getLatestPackages,
  stripPathOnDisk,
} from '../package';
import { IArboristNode, ServerPlugin } from '../types';

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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
  const arboristValues = getValues(rootArboristNode);

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
      const { devDependencies } = fs.readJSONSync(
        `${depNode.realpath}/package.json`
      );

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
        devDependencies: Object.entries(devDependencies || {}).map(
          ([name, maybeVersion]) => `${name}@${maybeVersion}`
        ),
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
    devDependencies: [],
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

  const suggestionInput = {
    arboristValues,
    rootArboristNode,
    dependencies: report.dependencies,
  };

  for (const plugin of processedPlugins) {
    if (plugin.getTasks) {
      const suggestionTasks = plugin.getTasks();

      for (const suggestionTask of suggestionTasks) {
        const suggestionOutput = await suggestionTask.run(suggestionInput);

        if (suggestionOutput) {
          report.suggestions.push(suggestionOutput);
        }
      }

      console.log();
      console.log(`Timing for tasks for: ${plugin.name}`);
      for (const suggestionTask of suggestionTasks) {
        console.log(
          `${suggestionTask.name} (${formatDuration(
            suggestionTask.elapsedTime
          )})`
        );
      }
      console.log();
    }
  }

  return report;
}
