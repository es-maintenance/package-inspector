import { extendType, objectType } from 'nexus';

import { getPackageID, humanFileSize } from '../../lib/utils';
import { MiniPackage, Package } from './Package';
import { Suggestion } from './Suggestion';

export const TopSuggestions = objectType({
  name: 'TopSuggestions',
  definition(t) {
    t.nonNull.field('package', { type: Package });
    t.nonNull.int('count');
  },
});

export const Report = objectType({
  name: 'Report',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.list.field('dependencies', {
      type: Package,
      resolve: (_, __, ctx) => {
        // TODO: fix
        return Object.values(ctx.report.dependencies).map((dep: any) => {
          return {
            id: getPackageID(dep),
            name: dep.name,
            version: dep.version,
            type: dep.type,
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
    t.nonNull.field('root', { type: Package });
    t.nonNull.list.field('suggestions', { type: Suggestion });

    t.nonNull.string('summary', {
      resolve(parent, _, ctx) {
        const directDeps = ctx.report.root.dependencies;
        const allDeps = Object.keys(ctx.report.dependencies);
        const suggestionCount = ctx.report.suggestions
          // TODO: Fix
          .map((suggestion: any) => suggestion.actions.length)
          .reduce((a: number, b: number) => a + b, 0)
          .toLocaleString();

        const fileSize = humanFileSize(
          Object.keys(ctx.report.dependencies)
            .map((dependencyLookupKey: any) => {
              return (
                ctx.report.dependencies[dependencyLookupKey].metadata?.size
                  ?.physical || 0
              );
            })
            // TODO: fix
            .reduce((a: number, b: number) => a + b, 0)
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

    t.nonNull.list.field('topSuggestions', {
      type: TopSuggestions,
      resolve(parent, _, ctx) {
        // FIXME: this should be passed in from the query with a decorator
        const limit = 5;

        const tempMap: any = {};

        const suggestions = ctx.report.suggestions;

        // TODO: fix
        suggestions.forEach((suggestion: any) => {
          // TODO: fix
          suggestion.actions.forEach((action: any) => {
            const id = action.targetPackageId;
            const target = ctx.report.dependencies[id];
            const { version, name } = target;

            if (id) {
              if (!tempMap[id]) {
                const suggestionCount = {
                  package: {
                    id,
                    name,
                    version,
                  },
                  count: 1,
                };
                tempMap[id] = suggestionCount;
              } else {
                tempMap[id].count++;
              }
            }
          });
        });

        return Object.keys(tempMap)
          .map((key) => {
            return tempMap[key];
          })
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
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
          },
          suggestions: ctx.report.suggestions,
        };
      },
    });
  },
});

export const TitleQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.string('title', {
      resolve(_, __, ctx) {
        return ctx.report.root.name;
      },
    });
  },
});
