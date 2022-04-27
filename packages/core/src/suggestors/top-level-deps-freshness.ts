import semverDiff from 'semver/functions/diff';
import debug from 'debug';

import type { SuggestionInput } from '../types';
import { getBreadcrumb, getLatestPackages } from '../package';
import type { SuggestionAction, Suggestion } from '../models';

const logger = debug('pi-core:suggestor:top-level-deps-freshness');

export async function topLevelDepsFreshness({
  rootArboristNode,
  arboristValues,
}: SuggestionInput): Promise<Suggestion> {
  const dependencies = Object.assign(
    {},
    Object.assign({}, rootArboristNode?.package.devDependencies ?? {}),
    rootArboristNode?.package.dependencies ?? {}
  );
  const totalDeps = Object.keys(dependencies).length;
  const outOfDate: {
    major: string[];
    minor: string[];
    patch: string[];
  } = { major: [], minor: [], patch: [] };
  const latestPackages = await getLatestPackages(arboristValues);

  for (const dependency in dependencies) {
    try {
      const topLevelPackage = rootArboristNode?.children.get(dependency);

      if (topLevelPackage) {
        // ignore links or workspaces
        if (topLevelPackage.isLink || topLevelPackage.isWorkspace) {
          continue;
        }

        const breadcrumb = getBreadcrumb(topLevelPackage);
        let diff;
        try {
          diff = semverDiff(
            topLevelPackage.version,
            latestPackages[topLevelPackage.name]
          );
        } catch (ex) {
          logger(
            `Could not get a diff for ${topLevelPackage.name} between (${
              topLevelPackage.version
            } <> ${latestPackages[topLevelPackage.name]}) (${
              topLevelPackage.isLink || topLevelPackage.isWorkspace
            })`
          );
        }

        switch (diff) {
          case 'major':
            outOfDate.major.push(`${dependency}@${topLevelPackage.version}`);
            break;
          case 'minor':
            outOfDate.minor.push(`${dependency}@${topLevelPackage.version}`);
            break;
          case 'patch':
            outOfDate.patch.push(`${dependency}@${topLevelPackage.version}`);
            break;
        }
      } else {
        logger(`No topLevelPackage found for ${dependency}`);
      }
    } catch (ex) {
      // TODO: better debugging messaging here
      logger(ex);
    }
  }

  const actions: SuggestionAction[] = [];

  outOfDate.major.forEach((dependencyKey) => {
    actions.push({
      message: `"${dependencyKey}" is required as a direct dependency, the latest is ${
        latestPackages[dependencyKey.split('@')[0]]
      }. This is a major version out of date.`,
      targetPackage: dependencyKey,
    });
  });

  outOfDate.minor.forEach((dependencyKey) => {
    actions.push({
      message: `"${dependencyKey}" is required as a direct dependency, the latest is ${
        latestPackages[dependencyKey.split('@')[0]]
      }. This is a minor version out of date.`,
      targetPackage: dependencyKey,
    });
  });

  outOfDate.patch.forEach((dependencyKey) => {
    actions.push({
      message: `"${dependencyKey}" is required as a direct dependency, the latest is ${
        latestPackages[dependencyKey.split('@')[0]]
      }. This is a patch version out of date.`,
      targetPackage: dependencyKey,
    });
  });

  return {
    id: 'topLevelDepsFreshness',
    name: 'Top Level Dependency Freshness',
    message: `Out of the total ${totalDeps} explicit dependencies defined in the package.json; ${
      outOfDate.major.length
    } major versions out of date (${(
      (outOfDate.major.length / totalDeps) *
      100
    ).toFixed(2)}%), ${outOfDate.minor.length} minor versions out of date (${(
      (outOfDate.minor.length / totalDeps) *
      100
    ).toFixed(2)}%), ${outOfDate.patch.length} patch versions out of date (${(
      (outOfDate.patch.length / totalDeps) *
      100
    ).toFixed(2)}%)`,
    actions,
  };
}
