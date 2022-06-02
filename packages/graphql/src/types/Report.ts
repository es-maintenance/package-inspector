import { connectionFromArray } from 'graphql-relay';
import { extendType, objectType } from 'nexus';

import { getPackageID, humanFileSize } from '../utils';
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
    t.nonNull.connectionField('dependencies', {
      type: Package,
      resolve: (_, args, ctx, __) => {
        const entries = Object.values(ctx.report.dependencies).map((dep) => {
          return {
            id: getPackageID(dep),
            name: dep.name,
            version: dep.version,
            type: dep.type,
          };
        });

        return {
          ...connectionFromArray(entries, args),
          totalCount: entries.length,
        };
      },
      totalCount: () => {
        // TODO: This is not running, we think this is an issue with nexus. @gabriel will update with a nexus issue.
        return 0;
      },
    });
    t.nonNull.connectionField('latestPackages', {
      type: MiniPackage,
      async resolve(_, args, ctx, __) {
        const entries = Object.entries(ctx.report.latestPackages).map(
          ([name, version]) => {
            return {
              name,
              version,
            };
          }
        );

        return {
          ...connectionFromArray(entries, args),
          totalCount: entries.length,
        };
      },
      totalCount: () => {
        // TODO: This is not running, we think this is an issue with nexus. @gabriel will update with a nexus issue.
        return 0;
      },
    });
    t.nonNull.field('root', { type: Package });
    t.nonNull.connectionField('suggestions', {
      type: Suggestion,
      async resolve(_, args, ctx, __) {
        return {
          ...connectionFromArray(ctx.report.suggestions, args),
          totalCount: ctx.report.suggestions.length,
        };
      },
      totalCount: () => {
        // TODO: This is not running, we think this is an issue with nexus. @gabriel will update with a nexus issue.
        return 0;
      },
    });

    t.nonNull.string('summary', {
      resolve(parent, _, ctx) {
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

    t.nonNull.connectionField('topSuggestions', {
      type: TopSuggestions,
      async resolve(_, args, ctx) {
        const tempMap: any = {};

        const suggestions = ctx.report.suggestions;

        suggestions.forEach((suggestion) => {
          suggestion.actions.forEach((action) => {
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

        const entries = Object.keys(tempMap)
          .map((key) => {
            return tempMap[key];
          })
          .sort((a, b) => b.count - a.count);

        return {
          ...connectionFromArray(entries, args),
          totalCount: entries.length,
        };
      },
      totalCount: () => {
        // TODO: This is not running, we think this is an issue with nexus. @gabriel will update with a nexus issue.
        return 0;
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
