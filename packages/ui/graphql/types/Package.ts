import { objectType } from 'nexus';

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
    t.list.string('pathsOnDisk'); // TODO: maybe need to resolve here
    t.field('size', {
      // TODO: need to resolve here
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
      resolve() {
        return []; // TODO: impl after ctx.report is impl
      },
    });

    t.string('funding');
    t.string('homepage');
    t.field('metadata', {
      type: PackageMetadata,
    });
    t.string('type'); // TODO: look into this being an Enum instead
  },
});
