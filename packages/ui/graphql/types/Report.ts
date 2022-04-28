import { extendType, objectType } from 'nexus';
import { humanFileSize } from '../../lib/utils';
import { getPackageID } from '../utils';

import { MiniPackage, Package } from './Package';

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.list.field('dependencies', {
      type: Package,
      resolve: (_, __, ctx) => {
        return Object.values(ctx.report.dependencies).map((dep) => {
          return {
            id: getPackageID(dep),
            name: dep.name,
            version: dep.version,
          };
        });
      },
    });
    t.nonNull.list.field('latestPackages', {
      type: MiniPackage,
      resolve(_, __, ctx) {
        return Object.entries(ctx.report.latestPackages).map(
          ([name, version]) => {
            return {
              name,
              version,
            };
          }
        );
      },
    });
    t.nonNull.field('root', { type: Package }); // FIXME: root.dependencies are not resolving
    t.nonNull.string('summary', {
      resolve: (parent, __, ctx) => {
        const directDeps = ctx.report.root.dependencies;
        const allDeps = Object.keys(ctx.report.dependencies);
        const suggestionCount = ctx.report.suggestions
          .map((suggestion) => suggestion.actions.length)
          .reduce((a, b) => a + b, 0)
          .toLocaleString();

        const fileSize = humanFileSize(
          Object.keys(ctx.report.dependencies)
            .map((dependencyLookupKey) => {
              return (
                ctx.report.dependencies[dependencyLookupKey].metadata?.size
                  ?.physical || 0
              );
            })
            .reduce((a, b) => a + b, 0)
        );

        return (
          `The project "${parent.root.name}" currently ` +
          `has ${directDeps.length.toLocaleString()} direct dependencies. ` +
          `As well as ${allDeps.length.toLocaleString()} total sub dependencies. ` +
          `There are a total of ${suggestionCount} suggestions. ` +
          `The size currently taken up by the dependencies is ${fileSize}`
        );
      },
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
            ...ctx.report.root,
            id: `${ctx.report.root.name}@${ctx.report.root.version}`,
            dependencies: ctx.report.root.dependencies.map((depID) => {
              const pkg = ctx.report.dependencies[depID];
              return {
                id: getPackageID(pkg),
                name: pkg.name,
                version: pkg.version,
              };
            }),
          },
        };
      },
    });
  },
});
