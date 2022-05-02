import { parseDependencyKey } from '@package-inspector/core';
import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { getPackageID } from '../utils';
import { Suggestion } from './Suggestion';

export const MiniPackage = objectType({
  name: 'MiniPackage',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('version');
  },
});

export const SizeInfo = objectType({
  name: 'SizeInfo',
  definition(t) {
    t.int('files');
    t.int('physical');
  },
});

export const PackageMetadata = objectType({
  name: 'PackageMetadata',
  definition(t) {
    t.list.string('pathsOnDisk');
    t.field('size', {
      type: SizeInfo,
    });
  },
});

// This is a top level package that contains all the iterations of itself
export const PackageCompound = objectType({
  name: 'PackageCompound',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('latest', {
      resolve(me, _, ctx) {
        const name = me.name;

        return ctx.report.latestPackages[name];
      },
    });
    t.nonNull.list.field('variants', {
      type: Package,
      resolve(me, __, ctx) {
        const packageName = me.name;

        const variants = Object.keys(ctx.report.dependencies).filter(
          (dependencyKey) => {
            return packageName === parseDependencyKey(dependencyKey).name;
          }
        );

        return variants
          ? variants.map((depID: string) => {
              const pkgDep = ctx.report.dependencies[depID];
              return {
                id: getPackageID(pkgDep),
                name: pkgDep.name,
                version: pkgDep.version,
                type: pkgDep.type,
              };
            })
          : [];
      },
    });
  },
});

export const Package = objectType({
  name: 'Package',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('version');

    t.nonNull.list.field('dependencies', {
      type: Package,
      resolve(me, __, ctx) {
        const pkg =
          me.name === ctx.report.root.name
            ? ctx.report.root // If this is the root, get the serialized-package from the report's root.
            : ctx.report.dependencies[me.id]; // Otherwise find the package definition in the provided map.

        return pkg
          ? pkg.dependencies.map((depID) => {
              const pkgDep = ctx.report.dependencies[depID];
              return {
                id: getPackageID(pkgDep),
                name: pkgDep.name,
                version: pkgDep.version,
                type: pkgDep.type,
              };
            })
          : [];
      },
    });

    // This is the list of parents that bring in this dependency
    t.nonNull.list.field('parent', {
      type: Package,
      resolve(me, __, ctx) {
        // This is going to give us the packageKey
        const id = me.id;

        return Object.keys(ctx.report.dependencies)
          .filter((depId) => {
            return ctx.report.dependencies[depId].dependencies.indexOf(id) > -1;
          })
          .map((depId) => {
            return {
              id: getPackageID(ctx.report.dependencies[depId]),
              ...ctx.report.dependencies[depId],
            };
          });
      },
    });

    t.nonNull.list.field('suggestions', {
      type: Suggestion,
      resolve(me, __, ctx) {
        // This is going to give us the packageKey
        const id = me.id;

        return ctx.report.suggestions
          .map((suggestion) => {
            return {
              ...suggestion,
              actions: suggestion.actions.filter((action) => {
                return action.targetPackageId === id;
              }),
            };
          })
          .filter((suggestion) => {
            // only return suggestions that have suggestions that have actions
            return suggestion?.actions.length > 0;
          });
      },
    });

    t.string('funding');
    t.string('homepage');
    t.field('metadata', {
      type: PackageMetadata,
      resolve(me, _, ctx) {
        const pkg = ctx.report.dependencies[me.id];

        if (!pkg.metadata) {
          return null;
        }

        return {
          pathsOnDisk: pkg.metadata.pathsOnDisk,
          size: {
            files: pkg.metadata.size?.files,
            physical: pkg.metadata.size?.physical,
          },
        };
      },
    });
    t.string('type'); // TODO: look into this being an Enum instead
  },
});

export const PackagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('packages', {
      type: Package,
      resolve(_, __, ctx) {
        return Object.values(ctx.report.dependencies).map((dep) => {
          return {
            id: getPackageID(dep),
            name: dep.name,
            version: dep.version,
          };
        });
      },
    });
  },
});

export const PackageByVersionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('packageByVersion', {
      type: Package,
      args: {
        packageName: nonNull(stringArg()),
        packageVersion: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        const packageModel =
          ctx.report.dependencies[`${args.packageName}@${args.packageVersion}`];

        return packageModel
          ? {
              id: getPackageID(packageModel),
              name: packageModel.name,
              type: packageModel.type,
              version: packageModel.version,
            }
          : null;
      },
    });
  },
});

export const PackageQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('package', {
      type: PackageCompound,
      args: {
        packageName: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        const { packageName } = args;
        const variants = Object.keys(ctx.report.dependencies).filter(
          (dependencyKey) => {
            return packageName === parseDependencyKey(dependencyKey).name;
          }
        );

        return variants
          ? {
              name: packageName,
              variants,
            }
          : null;
      },
    });
  },
});
