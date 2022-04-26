import path from 'path';
import { IPackageJson } from 'package-json-type';
import Arborist from '@npmcli/arborist';

import { IArboristEdge, IArboristNode } from '../types';
import { getBreadcrumb, getDirectorySize, getLatestPackages } from '../package';
import {
  nestedDependencyFreshness,
  notBeingAbsorbedByTopLevel,
  packagesWithExtraArtifacts,
  packagesWithPinnedVersions,
  topLevelDepsFreshness,
} from '../suggestors';

export interface IActionMeta {
  // where it exists in the tree (which dep brought this in) A->B->C
  breadcrumb: string;
  name: string;
  // path to the full directory (might be )
  directory: string;
  version: string;
  // optional b/c the item might not actually exist where specified (the "link" has 0 bytes)
  size?: number;
}

export interface IAction {
  message: string;
  meta: IActionMeta;
}

export interface ISuggestion {
  id: string;
  name: string;
  message: string;
  actions: IAction[];
}

export interface Package
  extends Pick<IPackageJson, 'name' | 'version' | 'funding' | 'homepage'> {
  dependencies: Package[];
  pathOnDisk: string;
  breadcrumb: string;
  size: number;
  type?: string;
}

export interface PackageVersionByName {
  name: string;
  version: string;
}

export interface Report {
  latestPackages: PackageVersionByName[];
  package: Package;
  dependencies: Package[];
  suggestions: ISuggestion[];
}

function getValues(dependencyTree: IArboristNode) {
  // ignore the root node
  return [...dependencyTree.inventory.values()].filter(
    (node) => node.location !== ''
  );
}

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

export async function generateReport(cwd: string): Promise<Report> {
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
    const edge = [...entryInfo.edgesIn.values()].find((edgeIn) => {
      return edgeIn.name === entryInfo.name;
    });

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
      type: edge?.type,
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
