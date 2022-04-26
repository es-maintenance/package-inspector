import semverDiff from 'semver/functions/diff';
import { IArboristNode, SuggestionInput } from '../types';
import { getBreadcrumb, getLatestPackages } from '../package';

// TODO: cleanup this export/import pattern
import { IAction, ISuggestion } from '../report/generate-report';

/**
 * What percentage of your nested dependencies do you bring in that are out of date
 * (major, minor, patch)
 */
export async function nestedDependencyFreshness({
  arboristValues,
}: SuggestionInput): Promise<ISuggestion> {
  const outOfDate: {
    major: IArboristNode[];
    minor: IArboristNode[];
    patch: IArboristNode[];
  } = {
    major: [],
    minor: [],
    patch: [],
  };
  let totalDeps = 0;

  const latestPackages = await getLatestPackages(arboristValues);

  for (const node of arboristValues) {
    // ignore links or workspaces
    if (node.isLink || node.isWorkspace) {
      continue;
    }

    totalDeps += 1;

    try {
      let diff;
      try {
        diff = semverDiff(node.version, latestPackages[node.name]);
      } catch (ex) {
        console.log(
          `Could not get a diff for ${node.name} between (${node.version} <> ${
            latestPackages[node.name]
          }) (${node.isLink || node.isWorkspace})`
        );
      }

      switch (diff) {
        case 'major':
          outOfDate.major.push(node);
          break;
        case 'minor':
          outOfDate.minor.push(node);
          break;
        case 'patch':
          outOfDate.patch.push(node);
          break;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  const actions: IAction[] = [];

  outOfDate.major.forEach((node) => {
    const { name, version, path } = node;
    const breadcrumb = getBreadcrumb(node);
    actions.push({
      message: `"${name}@${version}" is required at "${breadcrumb}", the latest is ${latestPackages[name]}. This is a major version out of date.`,
      meta: {
        name,
        version,
        directory: path,
        breadcrumb,
      },
    });
  });

  outOfDate.minor.map((node) => {
    const { name, version, path } = node;
    const breadcrumb = getBreadcrumb(node);
    actions.push({
      message: `"${name}@${version}" is required at "${breadcrumb}", the latest is ${latestPackages[name]}. This is a minor version out of date.`,
      meta: {
        name,
        version,
        directory: path,
        breadcrumb,
      },
    });
  });

  outOfDate.patch.map((node) => {
    const { name, version, path } = node;
    const breadcrumb = getBreadcrumb(node);
    actions.push({
      message: `"${name}@${version}" is required at "${breadcrumb}", the latest is ${latestPackages[name]}. This is a patch version out of date.`,
      meta: {
        name,
        version,
        directory: path,
        breadcrumb,
      },
    });
  });

  return {
    id: 'nestedDependencyFreshness',
    name: 'Nested Dependency Freshness',
    message: `Out of the total ${totalDeps} sub packages currently installed; ${
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
