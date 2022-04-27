/**
 *export interface Report {
  latestPackages: PackageVersionByName[];
  package: Package;
  dependencies: Package[];
  suggestions: ISuggestion[];
}
 */

type LatestPackages = Record<string, string>;

interface Package {}

export class Report {
  latestPackages: LatestPackages = {};
  root!: Package; // TODO: get rid of !
}
