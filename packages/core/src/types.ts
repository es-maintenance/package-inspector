import { IDependencyMap, IPackageJson } from 'package-json-type';

// TODO: fix... bad
import { IActionMeta } from './report/generate-report';

export interface IArboristEdge {
  type: string;
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

export interface IVersionMeta extends IActionMeta {
  version: string;
}

export interface SuggestionInput {
  rootArboristNode?: IArboristNode;
  arboristValues: IArboristNode[];
  latestPackages?: IDependencyMap;
}
