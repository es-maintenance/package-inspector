import { Report } from '@package-inspector/core';
import { JsonProvider } from '../data';

export interface Context {
  report: Report;
}

export const context: Context = {
  report: JsonProvider.getReport(),
};
