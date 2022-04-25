import { IDependencyMap, IPackageJson } from 'package-json-type';

export type DependenciesList = [string, IDependency][];

export interface IArboristEdge {
  type: Set<string>;
  name: string;
  spec: string;
  accept: string;
  from: IArboristNode;
  to: IArboristNode;
}

// a very weak definition for https://github.com/npm/arborist/blob/48eb8fa01ea1cd1f89f47379b1ba4881a8bb9fbc/lib/node.js
export interface IArboristNode {
  children: Map<string, IArboristNode>;
  dev: boolean;
  devOptional: boolean;
  dummy: boolean;
  edgesIn: Set<IArboristEdge>;
  edgesOut: Map<string, IArboristEdge>;
  errors: Array<any>;
  extraneous: boolean;
  fsChildren: Set<IArboristNode>;
  hasShrinkwrap: boolean;
  integrity: unknown | null;
  inventory: Map<string, IArboristNode>;
  legacyPeerDeps: boolean;
  linksIn: Set<IArboristNode>;
  location: string;
  name: string;
  optional: boolean;
  path: string;
  peer: string;
  realpath: string;
  resolved: unknown | null;
  sourceReference: unknown | null;
  tops: Set<IArboristNode>;
  package: IPackageJson;
  packageName: string;
  isLink: boolean;
  isWorkspace: boolean;
  homepage: string;
  funding: string;
  version: string;
}

export interface IDependency {
  breadcrumb: string;
  funding?: string;
  homepage?: string;
  location: string;
  version: string;
  name: string;
  size: number;
}

export interface IActionMeta {
  // where it exists in the tree (which dep brought this in) A->B->C
  breadcrumb: string;
  name: string;
  // path to the full directory (might be )
  directory: string;
  version: string;
  // optional b/c the item might not actually exist where specified (the "link" has 0 bytes)
  size?: number;
}

export interface IVersionMeta extends IActionMeta {
  version: string;
}

export interface IAction {
  message: string;
  meta: IActionMeta;
}

export interface ISuggestionInput {
  rootArboristNode?: IArboristNode;
  arboristValues: IArboristNode[];
  latestPackages?: IDependencyMap;
}

export interface ISuggestion {
  id: string;
  name: string;
  message: string;
  actions: IAction[];
}

export interface IReport {
  latestPackages: IDependencyMap;
  package: IPackageJson;
  dependencies: DependenciesList;
  suggestions: ISuggestion[];
}
