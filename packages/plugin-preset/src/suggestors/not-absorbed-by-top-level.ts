import {
  type Suggestion,
  type SuggestionAction,
  type SuggestionInput,
  getBreadcrumb,
  getDirectorySize,
  humanFileSize,
  SuggestionTask,
} from '@package-inspector/core';
import debug from 'debug';
import path from 'path';

const logger = debug('pi-core:suggestor:not-absorbed-by-top-level');

/**
 * What dependencies you are bringing in that don't absorb into
 * the semver ranges at the top level
 * version range that doesn't satisfy the top level version range
 */
export class NotBeingAbsorbedByTopLevel extends SuggestionTask {
  name = 'Not Being Absorbed By Top Level';

  async task({
    rootArboristNode,
    arboristValues,
    dependencies,
  }: SuggestionInput): Promise<Suggestion> {
    const notAbsorbed: SuggestionAction[] = [];

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
        logger(`No topLevelPackage for ${topLevelPath}`);
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
          }". This takes up an additional ${humanFileSize(size.physical)}.`,
          targetPackageId: `${node.name}@${node.version}`,
        });
      }
    }

    return Promise.resolve({
      id: 'notBeingAbsorbedByTopLevel',
      pluginTarget: '@package-inspector/plugin-preset',
      name: 'Dependencies not being absorbed',
      message: `There are currently ${notAbsorbed.length.toLocaleString()} duplicate packages being installed on disk contributing to ${humanFileSize(
        notAbsorbed.reduce(
          (total, dep) =>
            total +
            (dependencies[dep.targetPackageId].metadata?.size?.physical || 0),
          0
        )
      )}`,
      actions: notAbsorbed,
    });
  }
}
