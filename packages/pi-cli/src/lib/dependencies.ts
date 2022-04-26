import path from 'path';
import debug from 'debug';

import { getBreadcrumb } from './utils/breadcrumb';
import { getDirectorySize } from './utils/disk';
import { getLatestPackages } from './utils/latest-packages';

import {
  IReport,
  IArboristNode,
  Package,
  PackageVersionByName,
  IArboristEdge,
} from '../types';
import {
  topLevelDepsFreshness,
  nestedDependencyFreshness,
  notBeingAbsorbedByTopLevel,
  packagesWithExtraArtifacts,
  packagesWithPinnedVersions,
} from './suggestors';

debug('package-inspector');

const Arborist = require('@npmcli/arborist');

function convertDepsFormat(edgesOut: Map<string, IArboristEdge>): Package[] {
  return [...edgesOut.values()]
    .filter((dependency) => {
      const node = dependency.to;

      // We don't have a node when it is optional or a peer
      // At this point we don't count those as they are counted as a part of the package that brings them in
      return node;
    })
    .map((dependency) => {
      const node = dependency.to;

      return {
        breadcrumb: getBreadcrumb(node),
        name: node.name,
        version: node.version,
        pathOnDisk: node.path,
        funding: node.funding || 'N/A',
        homepage: node.homepage || 'N/A',
        type: dependency.type,
        size: getDirectorySize({
          directory: node.path,
          exclude: new RegExp(path.resolve(node.path, 'node_modules')),
        }),
        // TODO: going more than two levels causes infinite recursion
        dependencies: [],
      };
    });
}

function getValues(dependencyTree: IArboristNode) {
  // ignore the root node
  return [...dependencyTree.inventory.values()].filter(
    (node) => node.location !== ''
  );
}

export default async function generateReport(cwd: string): Promise<IReport> {
  const arb = new Arborist({
    path: cwd,
  });
  const rootArboristNode: IArboristNode = await arb.loadActual();
  const arboristValues = getValues(rootArboristNode);
  const latestPackagesMap = await getLatestPackages(arboristValues);
  const latestPackages: PackageVersionByName[] = Object.keys(
    latestPackagesMap
  ).map((packageName) => {
    return {
      name: packageName,
      version: latestPackagesMap[packageName],
    };
  });
  const dependencies: Package[] = [];

  arboristValues.forEach((entryInfo) => {
    dependencies.push({
      pathOnDisk: entryInfo.path
        ? entryInfo.path.replace(process.cwd() + '/', '')
        : 'N/A',
      breadcrumb: getBreadcrumb(entryInfo),
      funding: entryInfo.funding || 'N/A',
      homepage: entryInfo.homepage || 'N/A',
      name: entryInfo.name,
      version: entryInfo.version,
      size: getDirectorySize({
        directory: entryInfo.path,
        exclude: new RegExp(path.resolve(entryInfo.path, 'node_modules')),
      }),
      // Get the correct values for these
      dependencies: convertDepsFormat(entryInfo.edgesOut),
    });
  });

  return {
    latestPackages,
    package: {
      ...{
        breadcrumb: getBreadcrumb(rootArboristNode),
        name: rootArboristNode.name,
        version: rootArboristNode.version,
        pathOnDisk: rootArboristNode.path,
        funding: rootArboristNode.funding || 'N/A',
        homepage: rootArboristNode.homepage || 'N/A',
      },
      size: 0,
      dependencies: convertDepsFormat(rootArboristNode.edgesOut),
    },
    dependencies,
    suggestions: [
      await packagesWithPinnedVersions({ arboristValues }),

      await packagesWithExtraArtifacts({ arboristValues }),

      await notBeingAbsorbedByTopLevel({ rootArboristNode, arboristValues }),

      await nestedDependencyFreshness({ rootArboristNode, arboristValues }),

      await topLevelDepsFreshness({
        rootArboristNode,
        arboristValues,
      }),
    ],
  };
}
