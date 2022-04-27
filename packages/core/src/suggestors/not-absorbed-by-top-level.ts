import path from 'path';
import debug from 'debug';

import type { SuggestionInput } from '../types';
import {
  getBreadcrumb,
  getDirectorySize,
  humanFileSize,
  stripPathOnDisk,
} from '../package';
import { ISuggestion } from '../report/generate-report';

/**
 * What dependencies you are bringing in that don't absorb into
 * the semver ranges at the top level
 * version range that doesn't satisfy the top level version range
 */
export function notBeingAbsorbedByTopLevel(
  { rootArboristNode, arboristValues }: SuggestionInput,
  workingPath: string
): Promise<ISuggestion> {
  const notAbsorbed = [];

  for (const node of arboristValues) {
    const topLevelPath = `node_modules/${node.name}`;

    // don't count dependencies that are topLevel dependencies
    if (topLevelPath === node.location) continue;

    const topLevelPackage = rootArboristNode?.children.get(node.name);

    // ignore links or workspaces
    if (node.isLink || node.isWorkspace) {
      continue;
    }

    // if there is no top level package there was no need to hoist it to deduplicate as there is only one package in the tree
    if (!topLevelPackage) {
      debug(`No topLevelPackage for ${topLevelPath}`);
      continue;
    }

    if (topLevelPackage && topLevelPackage.version !== node.version) {
      const breadcrumb = getBreadcrumb(node);
      const size = getDirectorySize({
        directory: node.path,
        exclude: new RegExp(path.resolve(node.path, 'node_modules')),
      });

      notAbsorbed.push({
        message: `"${
          node.name
        }" (${breadcrumb}) not absorbed because top level dep is "${
          topLevelPackage.version
        }" and this is "${
          node.version
        }". This takes up an additional ${humanFileSize(size)}.`,
        meta: {
          breadcrumb,
          name: node.name,
          directory: stripPathOnDisk(node.path, workingPath),
          version: node.version,
          size,
        },
      });
    }
  }

  return Promise.resolve({
    id: 'notBeingAbsorbedByTopLevel',
    name: 'Dependencies not being absorbed',
    message: `There are currently ${
      notAbsorbed.length
    } duplicate packages being installed on disk because they are not being absorbed into the top level semver range. This equates to a total of ${humanFileSize(
      notAbsorbed.reduce((total, dep) => total + dep.meta.size, 0)
    )}`,
    actions: notAbsorbed.sort((a, b) => b.meta.size - a.meta.size),
  });
}
