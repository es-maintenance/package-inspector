import fs from 'fs';
import path from 'path';

import type { SuggestionInput } from '../types';
import type { ISuggestion } from '../report/generate-report';

import { getBreadcrumb, getDirectorySize, humanFileSize } from '../package';

/**
 * // docs/ or tests/ is published to npm - how do you NOT publish them
 * (use ignore file or package.json.files[]?
 */
export async function packagesWithExtraArtifacts({
  arboristValues,
}: SuggestionInput): Promise<ISuggestion> {
  const extraArtifacts = [];

  for (const node of arboristValues) {
    const breadcrumb = getBreadcrumb(node);

    if (fs.existsSync(path.resolve(node.path, 'docs'))) {
      const size = getDirectorySize({
        directory: path.resolve(node.path, 'docs'),
      });

      if (size > 0) {
        extraArtifacts.push({
          message: `"${
            node.name
          }" (${breadcrumb}) has a "docs" folder which is not necessary for production usage ${humanFileSize(
            size
          )}.`,
          meta: {
            breadcrumb,
            name: node.name,
            directory: node.path,
            version: node.version,
            size,
          },
        });
      }
    }

    if (fs.existsSync(path.resolve(node.path, 'tests'))) {
      const size = getDirectorySize({
        directory: path.resolve(node.path, 'tests'),
      });

      if (size > 0) {
        extraArtifacts.push({
          message: `"${
            node.name
          }" (${breadcrumb}) has a "tests" folder which is not necessary for production usage ${humanFileSize(
            size
          )}.`,
          meta: {
            breadcrumb,
            name: node.name,
            directory: node.path,
            version: node.version,
            size,
          },
        });
      }
    }
  }

  return Promise.resolve({
    id: 'packagesWithExtraArtifacts',
    name: 'Packages with extra artifacts',
    message: `There are currently ${
      new Set(extraArtifacts.map((action) => action.meta.name)).size
    } packages with artifacts that are superflous and are not necessary for production usage. ${humanFileSize(
      extraArtifacts.reduce((total, dep) => total + dep.meta.size, 0)
    )}`,
    actions: extraArtifacts.sort((a, b) => b.meta.size - a.meta.size),
  });
}
