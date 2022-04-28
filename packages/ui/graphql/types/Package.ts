import { objectType } from 'nexus';

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
        const pkg = ctx.report.dependencies[me.id];

        return pkg
          ? pkg.dependencies.map((depID) => {
              const pkgDep = ctx.report.dependencies[depID];
              return {
                id: `${pkgDep.name}@${pkgDep.version}`, // FIXME: need to encode the `dep.name` since packages can have special chars in them.
                name: pkgDep.name,
                version: pkgDep.version,
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
