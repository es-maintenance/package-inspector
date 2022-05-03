import { extendType, nonNull, objectType, stringArg } from 'nexus';

import { getPackageID } from '../utils';
import { Package } from './Package';

export const SuggestionAction = objectType({
  name: 'SuggestionAction',
  definition(t) {
    t.nonNull.string('message');
    t.nonNull.string('targetPackageId');
    t.field('targetPackage', {
      type: Package,
      resolve(me, args, ctx) {
        const target = ctx.report.dependencies[me.targetPackageId];

        return target
          ? {
              id: getPackageID(target),
              name: target.name,
              version: target.version,
            }
          : null;
      },
    });
  },
});

export const Suggestion = objectType({
  name: 'Suggestion',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('pluginTarget');
    t.nonNull.string('message');
    t.nonNull.int('count', {
      resolve(me, args, ctx) {
        const actions = me.actions;

        return actions.length;
      },
    });
    t.nonNull.list.field('actions', { type: SuggestionAction });
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
      resolve(me, args, ctx) {
        const suggestionModel = ctx.report.suggestions.find(
          (s) => s.id === args.id
        );

        return suggestionModel
          ? {
              id: suggestionModel.id,
              name: suggestionModel.name,
              message: suggestionModel.message,
              pluginTarget: suggestionModel.pluginTarget,
              actions: suggestionModel.actions,
            }
          : null;
      },
    });
  },
});
