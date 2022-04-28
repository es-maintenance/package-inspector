import type {
  SuggestionAction,
  Suggestion,
  SuggestionInput,
} from '@package-inspector/core';

/**
 * suggestion because doesn't allow you to collapse versions
 * (you end up with copies of what could be the same thing)
 */
export async function packagesWithPinnedVersions({
  arboristValues,
}: SuggestionInput): Promise<Suggestion> {
  const { getBreadcrumb } = await import('@package-inspector/core');

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
          targetPackage: `${node.name}@${version}`,
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
    name: 'Packages with pinned dependencies',
    message: `There are currently ${packagedWithPinned.length.toLocaleString()} pinned dependencies`,
    actions: packagedWithPinned,
  });
}
