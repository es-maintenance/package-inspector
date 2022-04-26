import semverDiff from 'semver/functions/diff';
import type { IVersionMeta, SuggestionInput } from '../types';
import { getBreadcrumb, getLatestPackages } from '../package';

// TODO: this import/export is bad
import { IAction, ISuggestion } from '../report/generate-report';

export async function topLevelDepsFreshness({
  rootArboristNode,
  arboristValues,
}: // latestPackages: IDependencyMap
SuggestionInput): Promise<ISuggestion> {
  const dependencies = Object.assign(
    {},
    Object.assign({}, rootArboristNode?.package.devDependencies ?? {}),
    rootArboristNode?.package.dependencies ?? {}
  );
  const totalDeps = Object.keys(dependencies).length;
  const outOfDate: {
    major: IVersionMeta[];
    minor: IVersionMeta[];
    patch: IVersionMeta[];
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
          console.log(
            `Could not get a diff for ${topLevelPackage.name} between (${
              topLevelPackage.version
            } <> ${latestPackages[topLevelPackage.name]}) (${
              topLevelPackage.isLink || topLevelPackage.isWorkspace
            })`
          );
        }

        switch (diff) {
          case 'major':
            outOfDate.major.push({
              name: dependency,
              directory: `node_module/${dependency}`,
              version: topLevelPackage.version,
              breadcrumb,
            });
            break;
          case 'minor':
            outOfDate.minor.push({
              name: dependency,
              directory: `node_module/${dependency}`,
              version: topLevelPackage.version,
              breadcrumb,
            });
            break;
          case 'patch':
            outOfDate.patch.push({
              name: dependency,
              directory: `node_module/${dependency}`,
              version: topLevelPackage.version,
              breadcrumb,
            });
            break;
        }
      } else {
        console.log(`No topLevelPackage found for ${dependency}`);
      }
    } catch (ex) {
      // TODO: better debugging messaging here
      console.log(ex);
    }
  }

  const actions: IAction[] = [];

  outOfDate.major.forEach(({ name, directory, version, breadcrumb }) => {
    actions.push({
      message: `"${name}@${version}" is required as a direct dependency, the latest is ${latestPackages[name]}. This is a major version out of date.`,
      meta: {
        version,
        name,
        directory,
        breadcrumb,
      },
    });
  });

  outOfDate.minor.forEach(({ name, directory, version, breadcrumb }) => {
    actions.push({
      message: `"${name}@${version}" is required as a direct dependency, the latest is ${latestPackages[name]}. This is a minor version out of date.`,
      meta: {
        version,
        name,
        directory,
        breadcrumb,
      },
    });
  });

  outOfDate.patch.forEach(({ name, directory, version, breadcrumb }) => {
    actions.push({
      message: `"${name}@${version}" is required as a direct dependency, the latest is ${latestPackages[name]}. This is a patch version out of date.`,
      meta: {
        version,
        name,
        directory,
        breadcrumb,
      },
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
