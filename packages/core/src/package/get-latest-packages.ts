import debug from 'debug';
import { copyFile, writeFile } from 'fs/promises';
import { IDependencyMap } from 'package-json-type';
import path from 'path';
import tmp from 'tmp';

import { IArboristNode } from '../types';
import { getOutdated } from './get-outdated';

let _CACHEDLATESTPACKAGES: IDependencyMap = {};

export async function getLatestPackages(
  arboristValues: IArboristNode[]
): Promise<IDependencyMap> {
  // only do this once
  if (Object.keys(_CACHEDLATESTPACKAGES).length) {
    return _CACHEDLATESTPACKAGES;
  }
  // TODO: this should be cached for faster build times and not having to make large requests to NPM
  const fakePackageJson: { dependencies: IDependencyMap } = {
    dependencies: {},
  };

  const dependencyKeys = arboristValues
    .filter((node) => {
      // ignore linked packages and packages that have realpaths that are on disk (which means they are linked and potentially don't exist in the registry)
      return (
        (!node.isLink || !node.isWorkspace) &&
        node.realpath.includes('node_modules')
      );
    })
    .map((node) => node.name);

  dependencyKeys.forEach((key) => {
    if (key.includes('fastlane')) return;
    fakePackageJson.dependencies[key] = '*';
  });

  const tmpobj = tmp.dirSync({ unsafeCleanup: true });
  debug('Dir: ' + tmpobj.name);

  await writeFile(
    path.resolve(tmpobj.name, 'package.json'),
    JSON.stringify(fakePackageJson)
  );

  const latestPackages: IDependencyMap = {};
  try {
    // need to keep the registry context for the fake package.json so things get resolved correctly when checking outdated
    await copyFile(
      path.resolve(process.cwd(), '.npmrc'),
      path.resolve(tmpobj.name, '.npmrc')
    );
  } catch (ex) {
    debug('Could not copy .npmrc, using the default npm registry.');
  }

  const outdatedPackages = await getOutdated(tmpobj.name);

  for (const packageName in outdatedPackages) {
    latestPackages[packageName] = outdatedPackages[packageName].latest;
  }

  tmpobj.removeCallback();
  _CACHEDLATESTPACKAGES = latestPackages;

  return latestPackages;
}
