import { IResolvers } from '@graphql-tools/utils';
import { IReport } from '@package-inspector/cli';
import { JsonProvider } from '../data';
import { humanFileSize } from '../lib/utils';

export const resolvers: IResolvers = {
  Report: {
    summary: (parent: IReport) => {
      const directDeps = parent.package.dependencies.filter(
        (dep) => dep.type === 'prod' || dep.type === 'dev'
      );
      const allDeps = parent.dependencies; // TODO: maybe we need to filter ?
      const suggestionCount = parent.suggestions
        .map((suggestion) => suggestion.actions.length)
        .reduce((a, b) => a + b, 0)
        .toLocaleString();
      const fileSize = humanFileSize(
        parent.dependencies
          .map((dependencyInfo) => dependencyInfo.size)
          .reduce((a, b) => a + b, 0)
      );

      return (
        `The current project ${parent.package.name} currently` +
        `has ${directDeps.length.toLocaleString()} direct dependencies.` +
        `As well as ${allDeps.length.toLocaleString()} total sub dependencies. ` +
        `There are a total of ${suggestionCount} suggestions.` +
        `The size currently taken up by the dependencies is ${fileSize}`
      );
    },
  },
  Query: {
    report: () => JsonProvider.getReport(),
  },
};
