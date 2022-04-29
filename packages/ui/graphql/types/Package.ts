import { extendType, objectType } from 'nexus';
import { getPackageID } from '../utils';

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

export const PackageQuery = extendType({
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
