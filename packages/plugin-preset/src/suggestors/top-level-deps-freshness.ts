import {
  type Suggestion,
  getLatestPackages,
  SuggestionAction,
  SuggestionInput,
  SuggestionTask,
} from '@package-inspector/core';
import debug from 'debug';
import semverDiff from 'semver/functions/diff';

const logger = debug('pi-core:suggestor:top-level-deps-freshness');

type OutOfDateNode = {
  name: string;
  version: string;
  workspace?: string;
};

function categorizeDepByType(
  outOfDate: {
    major: OutOfDateNode[];
    minor: OutOfDateNode[];
    patch: OutOfDateNode[];
  },
  latestPackages: any,
  name: string,
  version: string,
  workspace?: string
) {
  let diff;

  try {
    diff = semverDiff(version, latestPackages[name]);
  } catch (ex) {
    logger(
      `Could not get a diff for ${name} between (${version} <> ${latestPackages[name]})`
    );
  }

  switch (diff) {
    case 'major':
      outOfDate.major.push({
        name,
        version,
        workspace,
      });
      break;
    case 'minor':
      outOfDate.minor.push({
        name,
        version,
        workspace,
      });
      break;
    case 'patch':
      outOfDate.patch.push({
        name,
        version,
        workspace,
      });
      break;
  }
}

export class TopLevelDepsFreshness extends SuggestionTask {
  name = 'Top Level Dependency Freshness';

  async task({
    rootArboristNode,
    arboristValues,
  }: SuggestionInput): Promise<Suggestion> {
    let totalDeps = 0;

    const outOfDate: {
      major: OutOfDateNode[];
      minor: OutOfDateNode[];
      patch: OutOfDateNode[];
    } = { major: [], minor: [], patch: [] };
    // TODO: this should not be done in this package, it should be done at the top level core library
    const latestPackages = await getLatestPackages(arboristValues);

    if (rootArboristNode?.edgesOut) {
      for (const [, edge] of rootArboristNode.edgesOut) {
        // we will need to iterate through the workspace deps to get the most update information
        if (edge.type === 'workspace') {
          if (edge.to.package.devDependencies) {
            for (const name in edge.to.package.devDependencies) {
              totalDeps += 1;

              categorizeDepByType(
                outOfDate,
                latestPackages,
                name,
                edge.to.package.devDependencies[name],
                edge.to.package.name
              );
            }
          }

          if (edge.to.package.dependencies) {
            for (const name in edge.to.package.dependencies) {
              totalDeps += 1;

              categorizeDepByType(
                outOfDate,
                latestPackages,
                name,
                edge.to.package.dependencies[name]
              );
            }
          }
        } else {
          totalDeps += 1;

          categorizeDepByType(
            outOfDate,
            latestPackages,
            edge.to.name,
            edge.to.version
          );
        }
      }
    }

    const actions: SuggestionAction[] = [];

    outOfDate.major.forEach(({ name, version, workspace }) => {
      const dependencyKey = `${name}@${version}`;

      actions.push({
        message: `"${dependencyKey}" is required as a direct dependency${
          workspace ? ` of the workspace "${workspace}"` : ','
        } the latest is ${
          latestPackages[name]
        }. This is a major version out of date.`,
        targetPackageId: dependencyKey,
      });
    });

    outOfDate.minor.forEach(({ name, version, workspace }) => {
      const dependencyKey = `${name}@${version}`;

      actions.push({
        message: `"${dependencyKey}" is required as a direct dependency${
          workspace ? ` of the workspace "${workspace}"` : ','
        } the latest is ${
          latestPackages[name]
        }. This is a minor version out of date.`,
        targetPackageId: dependencyKey,
      });
    });

    outOfDate.patch.forEach(({ name, version, workspace }) => {
      const dependencyKey = `${name}@${version}`;

      actions.push({
        message: `"${dependencyKey}" is required as a direct dependency${
          workspace ? ` of the workspace "${workspace}"` : ','
        } the latest is ${
          latestPackages[name]
        }. This is a patch version out of date.`,
        targetPackageId: dependencyKey,
      });
    });

    return {
      id: 'topLevelDepsFreshness',
      pluginTarget: '@package-inspector/plugin-preset',
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
}
