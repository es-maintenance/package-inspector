import {
  type Suggestion,
  type SuggestionAction,
  type SuggestionInput,
  getBreadcrumb,
  getDirectorySize,
  humanFileSize,
  SuggestionTask,
} from '@package-inspector/core';
import fs from 'fs';
import path from 'path';

/**
 * // docs/ or tests/ is published to npm - how do you NOT publish them
 * (use ignore file or package.json.files[]?
 */
export class PackagesWithExtraArtifacts extends SuggestionTask {
  name = 'Package With Extra Artifacts';

  async task({
    arboristValues,
    dependencies,
  }: SuggestionInput): Promise<Suggestion> {
    const extraArtifacts: SuggestionAction[] = [];

    for (const node of arboristValues) {
      const breadcrumb = getBreadcrumb(node);

      if (fs.existsSync(path.resolve(node.path, 'docs'))) {
        const size = getDirectorySize({
          directory: path.resolve(node.path, 'docs'),
        });

        if (size.physical > 0) {
          extraArtifacts.push({
            message: `"${
              node.name
            }" (${breadcrumb}) has a "docs" folder which is not necessary for production usage ${humanFileSize(
              size.physical
            )}.`,
            targetPackageId: `${node.name}@${node.version}`,
          });
        }
      }

      if (fs.existsSync(path.resolve(node.path, 'tests'))) {
        const size = getDirectorySize({
          directory: path.resolve(node.path, 'tests'),
        });

        if (size.physical > 0) {
          extraArtifacts.push({
            message: `"${
              node.name
            }" (${breadcrumb}) has a "tests" folder which is not necessary for production usage ${humanFileSize(
              size.physical
            )}.`,
            targetPackageId: `${node.name}@${node.version}`,
          });
        }
      }
    }

    return Promise.resolve({
      id: 'packagesWithExtraArtifacts',
      pluginTarget: '@package-inspector/plugin-preset',
      name: 'Packages with extra artifacts',
      message: `There are currently ${extraArtifacts.length.toLocaleString()} extra artifacts contributing to ${humanFileSize(
        extraArtifacts.reduce(
          (total, dep) =>
            total +
            (dependencies[dep.targetPackageId].metadata?.size?.physical || 0),
          0
        )
      )}`,
      actions: extraArtifacts,
    });
  }
}
