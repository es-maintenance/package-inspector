import { objectType } from 'nexus';
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
    t.nonNull.string('message');
    t.nonNull.list.field('actions', {
      type: SuggestionAction,
      resolve(parent, __, ctx) {
        const suggestion = ctx.report.suggestions.find(
          ({ id }) => id === parent.id
        );

        if (!suggestion) {
          return [];
        }

        return suggestion.actions.map((action) => {
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
