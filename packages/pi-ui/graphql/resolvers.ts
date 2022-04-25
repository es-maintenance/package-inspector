import report from './report.json';

export const resolvers = {
  Query: {
    report: () => report,
  },
};
