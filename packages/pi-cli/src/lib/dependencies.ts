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
      dependencies: [],
      devDependencies: [],
    });
  });

  return {
    latestPackages,
    // fix this to be real
    package: rootArboristNode.package as unknown as Package,
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
