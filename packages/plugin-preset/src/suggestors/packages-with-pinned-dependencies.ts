import {
  type SuggestionAction,
  type Suggestion,
  type SuggestionInput,
  getBreadcrumb,
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

  async task({ arboristValues }: SuggestionInput): Promise<Suggestion> {
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

    // TODO: This is the old message that we need to be able to somehow get back.
    // It does require us to pass in the dependencyMap / the report to get the node info such as size
    /**
     `There are currently ${
        new Set(packagedWithPinned.map((action) => action.meta.name)).size
      } packages with pinned versions which will never collapse those dependencies causing an additional ${humanFileSize(
        packagedWithPinned.reduce((total, dep) => total + dep.meta.size, 0)
      )}`,
    */
    return Promise.resolve({
      id: 'packagesWithPinnedVersions',
      pluginTarget: '@package-inspector/plugin-preset',
      name: 'Packages with pinned dependencies',
      message: `There are currently ${packagedWithPinned.length.toLocaleString()} pinned dependencies`,
      actions: packagedWithPinned,
    });
  }
}
