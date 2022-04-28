import { extendType, objectType } from 'nexus';

import { Package } from './Package';

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.list.field('dependencies', {
      type: Package,
      resolve: () => [],
    });
    t.nonNull.field('root', {
      // TODO: resolve this
      type: Package,
    });
    t.nonNull.string('summary', {
      resolve: () => 'This is the default summary',
    });
  },
});

export const ReportQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('report', {
      type: Report,
      resolve(_, __, ctx) {
        return {
          id: 'root',
          root: {
            id: `${ctx.report.root.name}@${ctx.report.root.version}`,
            ...ctx.report.root,
          },
        };
      },
    });
  },
});
