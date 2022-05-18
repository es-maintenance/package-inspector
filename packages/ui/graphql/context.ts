import { Context } from '@package-inspector/graphql';

import { JsonProvider } from '../data';

export const context: Context = {
  report: JsonProvider.getReport(),
};
