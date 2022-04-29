import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { getPackageID } from '../utils';

import { Package } from './Package';

export const SuggestionAction = objectType({
  name: 'SuggestionAction',
  definition(t) {
    t.nonNull.string('message');
    t.field('targetPackage', { type: Package });
  },
});

export const Suggestion = objectType({
  name: 'Suggestion',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('pluginTarget');
    t.nonNull.string('message');
    t.nonNull.list.field('actions', {
      type: SuggestionAction,
      resolve(parent, __, ctx) {
        // FIXME: don't use `any` type
        const suggestionsArray: any[] = [];

        Object.keys(ctx.report.suggestions).forEach((pluginName) => {
          suggestionsArray.push(...ctx.report.suggestions[pluginName]);
        });

        const suggestion = suggestionsArray.find(({ id }) => id === parent.id);

        if (!suggestion) {
          return [];
        }

        // FIXME: don't use `any` type
        return suggestion.actions.map((action: any) => {
          // Because we do not traverse the entire dependency graph to populate the report.json file
          // we sometimes do not have access to the target package, need to fix the graph traversal to get rid of this.
          const target = ctx.report.dependencies[action.targetPackage];
          return {
            message: action.message,
            targetPackage: target
              ? {
                  id: getPackageID(target),
                  name: target.name,
                  version: target.version,
                }
              : null,
          };
        });
      },
    });
  },
});

export const SuggestionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('suggestion', {
      type: Suggestion,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        const allSuggestions = Object.keys(ctx.report.suggestions).flatMap(
          (pluginName) => ctx.report.suggestions[pluginName]
        );
        const suggestionModel = allSuggestions.find((s) => s.id === args.id);

        console.log(suggestionModel);
        return suggestionModel
          ? {
              id: suggestionModel.id,
              name: suggestionModel.name,
              message: suggestionModel.message,
              pluginTarget: suggestionModel.pluginTarget,
            }
          : null;
      },
    });
  },
});
