import {
  type Suggestion,
  type SuggestionAction,
  type SuggestionInput,
  getBreadcrumb,
  humanFileSize,
  SuggestionTask,
} from '@package-inspector/core';
import debug from 'debug';

const logger = debug('pi-core:suggestor:packages-with-pinned-versions');
/**
 * suggestion because doesn't allow you to collapse versions
 * (you end up with copies of what could be the same thing)
 */
export class PackagesWithPinnedVersions extends SuggestionTask {
  name = 'Packages with Pinned Versions';

  async task({
    arboristValues,
    dependencies,
  }: SuggestionInput): Promise<Suggestion> {
    logger('started');

    const packagedWithPinned: SuggestionAction[] = [];

    for (const node of arboristValues) {
      const breadcrumb = getBreadcrumb(node);

      const { dependencies } = node.package ?? {};
      for (const dependencyName in dependencies) {
        const version = dependencies[dependencyName];

        if (
          // might need to check the logic on this; "~" means "takes patches"
          // check node-semver to see the logc
          version.substring(0, 1) === '~'
        ) {
          packagedWithPinned.push({
            message: `"${node.name}" (${breadcrumb}) has a pinned version for ${dependencyName}@${version} that will never collapse.`,
            targetPackageId: `${node.name}@${node.version}`,
          });
        }
      }
    }

    return Promise.resolve({
      id: 'packagesWithPinnedVersions',
      pluginTarget: '@package-inspector/plugin-preset',
      name: 'Packages with pinned dependencies',
      message: `There are currently ${packagedWithPinned.length.toLocaleString()} pinned dependencies contributing to ${humanFileSize(
        packagedWithPinned.reduce(
          (total, dep) =>
            total +
            (dependencies[dep.targetPackageId].metadata?.size?.physical || 0),
          0
        )
      )}`,
      actions: packagedWithPinned,
    });
  }
}
