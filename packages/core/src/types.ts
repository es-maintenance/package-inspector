import type { IDependencyMap, IPackageJson } from 'package-json-type';
import type { Suggestion, DependenciesMap } from './models/Report';
import { SuggestionTask } from './suggestion/SuggestionTask';

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
  isProjectRoot: boolean;
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

export interface SuggestionInput {
  rootArboristNode?: IArboristNode;
  arboristValues: IArboristNode[];
  dependencies: DependenciesMap;
  latestPackages?: IDependencyMap;
}

export interface Plugin {
  name: string;
  version: string;
  // Plugin data is serialized to the report and available during render time
  pluginData: any;
  suggestions: Suggestion[];
}

export interface ServerPlugin extends Plugin {
  getTasks?(): SuggestionTask[];
}

export interface BrowserPlugin extends Plugin {
  // View rendered as a block on the report page
  reportView?: React.FC;
  // Renders as a full page experience
  pluginPageView?: React.FC;
  // Renders on the package page
  packageView?: React.FC;
  // Renders the card view for a given suggestion
  // FIXME: This needs to come from the UI code, not okay to use any
  cardView?: React.FC<{ suggestion: any }>;
}
