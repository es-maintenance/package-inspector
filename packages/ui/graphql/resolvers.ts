import { IResolvers } from '@graphql-tools/utils';
import type { Report } from '@package-inspector/core';
import { JsonProvider } from '../data';
import { humanFileSize } from '../lib/utils';

export const resolvers: IResolvers = {
  Report: {
    summary: (parent: Report) => {
      const directDeps = parent.root.dependencies;
      const allDeps = Object.keys(parent.dependencies);
      const suggestionCount = parent.suggestions
        .map((suggestion) => suggestion.actions.length)
        .reduce((a, b) => a + b, 0)
        .toLocaleString();
      const fileSize = humanFileSize(
        Object.keys(parent.dependencies)
          .map((dependencyLookupKey) => {
            return (
              parent.dependencies[dependencyLookupKey].metadata?.size
                ?.physical || 0
            );
          })
          .reduce((a, b) => a + b, 0)
      );

      return (
        `The current project ${parent.root.name} currently` +
        `has ${directDeps.length.toLocaleString()} direct dependencies.` +
        `As well as ${allDeps.length.toLocaleString()} total sub dependencies. ` +
        `There are a total of ${suggestionCount} suggestions.` +
        `The size currently taken up by the dependencies is ${fileSize}`
      );
    },
    dependencies(parent: Report) {
      return Object.keys(parent.dependencies).map((dependencyLookupKey) => {
        return parent.dependencies[dependencyLookupKey];
      });
    },
    suggestions(parent: Report) {
      return Object.keys(parent.suggestions).map((pluginTarget) => {
        return parent.suggestions[pluginTarget];
      });
    },
    latestPackages(parent: Report) {
      return Object.keys(parent.latestPackages).map((packageName) => {
        return {
          name: packageName,
          version: parent.latestPackages[packageName],
        };
      });
    },
  },
  Query: {
    report: () => JsonProvider.getReport(),
  },
};
