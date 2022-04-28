import path from 'path';
import Arborist from '@npmcli/arborist';

import { IArboristNode } from '../types';
import {
  getDirectorySize,
  getLatestPackages,
  stripPathOnDisk,
} from '../package';
import {
  nestedDependencyFreshness,
  notBeingAbsorbedByTopLevel,
  packagesWithExtraArtifacts,
  topLevelDepsFreshness,
} from '../suggestors';

import { TestPlugin } from '@package-inspector/plugins/server';

import { Report } from '../models';

function getValues(dependencyTree: IArboristNode) {
  // ignore the root node
  return [...dependencyTree.inventory.values()].filter(
    (node) => !node.isProjectRoot
  );
}

export async function generateReport(cwd: string): Promise<Report> {
  const testPlugin = new TestPlugin();

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
      report.dependencies[lookupKey] = {
        funding: depNode.funding,
        homepage: depNode.homepage,
        name: depNode.name,
        version: depNode.version,
        type: edge?.type,
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

  report.suggestions = [
    ...(await testPlugin.getSuggestions(suggestionInput)),

    await packagesWithExtraArtifacts(suggestionInput),
    await notBeingAbsorbedByTopLevel(suggestionInput),
    await nestedDependencyFreshness(suggestionInput),
    await topLevelDepsFreshness(suggestionInput),
  ];

  return report;
}
