import path from 'path';
import { ISuggestion, ISuggestionInput } from '../../types';
import { getBreadcrumb } from '../utils/breadcrumb';
import { getDirectorySize } from '../utils/disk';
import humanFileSize from '../utils/human-file-size';

/**
 * suggestion because doesn't allow you to collapse versions
 * (you end up with copies of what could be the same thing)
 */
export default async function packagesWithPinnedVersions({
  arboristValues,
}: ISuggestionInput): Promise<ISuggestion> {
  const packagedWithPinned = [];

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
        try {
          const size = getDirectorySize({
            directory: node.edgesOut.get(dependencyName)?.to.path ?? '',
            exclude: new RegExp(path.resolve(node.path, 'docs')),
          });

          packagedWithPinned.push({
            message: `"${node.name}" (${breadcrumb}) has a pinned version for ${dependencyName}@${version} that will never collapse.`,
            meta: {
              breadcrumb,
              name: node.name,
              directory: node.path,
              version,
              size,
            },
          });
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  }

  return Promise.resolve({
    id: 'packagesWithPinnedVersions',
    name: 'Packages with pinned dependencies',
    message: `There are currently ${
      new Set(packagedWithPinned.map((action) => action.meta.name)).size
    } packages with pinned versions which will never collapse those dependencies causing an additional ${humanFileSize(
      packagedWithPinned.reduce((total, dep) => total + dep.meta.size, 0)
    )}`,
    actions: packagedWithPinned.sort((a, b) => b.meta.size - a.meta.size),
  });
}
