import { JsonProvider } from '../data';

export const resolvers = {
  Query: {
    report: () => JsonProvider.getReport(),
  },
};
