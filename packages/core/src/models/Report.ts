export type LatestPackages = Record<string, string>;

export interface SizeInfo {
  files: number;
  physical: number;
}

export interface PackageMetadata {
  size?: SizeInfo;
  pathsOnDisk: string[];
}

export interface DependenciesMap {
  [dependencyName: string]: Package;
}

export interface Package {
  name: string;
  version: string;
  metadata?: PackageMetadata;
  funding?: string;
  homepage?: string;
  dependencies: string[];
  type?: string;
}

export interface SuggestionAction {
  message: string;
  targetPackage: string;
}

export interface Suggestion {
  id: string;
  name: string;
  message: string;
  actions: SuggestionAction[];
}

export interface PluginInfo {
  [pluginKey: string]: any;
}

/**
 * @example
 ```
{
    "latestPackages": { "package-name": "version", "package-2": "version" }, // type { [key: string]: semver }
    "root": {
        // type Package
        "name": "docusaurus-plugin-search-local",
        "version": "0.5.0",
        "metadata": {
            "size": {
                // type SizeInfo
                "files": 1230,
                "physical": 386391
            },
            "pathsOnDisk": [
                // type string[]
                "/Users/lemiller/projects/docusaurus-plugin-search-local"
            ]
        },
        "funding": "N/A",
        "homepage": "N/A",
        "dependencies": ["leet-core@1.33.7"] // type alias dependencyKeyArray = string[]
    },
    "dependencies": {
        // type { [key: string]: Package }
        "@algolia/autocomplete-core@0.5.0": {
            // type Package
            "funding": "N/A",
            "homepage": "N/A",
            "name": "@algolia/autocomplete-core",
            "version": "0.5.0",
            "type": "prod",
            "metadata": {
                "size": {
                    // type SizeInfo
                    "files": 1230,
                    "physical": 386391
                },
                "pathsOnDisk": [
                    // type string[]
                    "/Users/lemiller/projects/docusaurus-plugin-search-local/node_modules/@algolia/autocomplete-core"
                ]
            },
            "dependencies": ["bar-baz@1.5.2", "foo-bar@1.3.7"] // type string[]
        }
    },
    "suggestions": [{
        "id": "packagesWithPinnedVersions",
        "name": "Packages with pinned dependencies",
        "message": "There are currently 38 packages with pinned versions which will never collapse those dependencies causing an additional 5.5 MiB",
        "actions": [{
            "message": "\"terser\" (parcel#@parcel/config-default#@parcel/optimizer-htmlnano#htmlnano#terser) has a pinned version for source-map-support@~0.5.20 that will never collapse.",
            "targetPackage": "package@version" // type PackageKey
        }]
    }],
    "pluginInfo": {
        "plugin-name@version": {} // type PluginInfo that comes from the plugin
    }
}
 ```
 */
export class Report {
  latestPackages: LatestPackages = {};
  root: Package;
  dependencies: DependenciesMap;
  suggestions: Suggestion[];
  pluginInfo: PluginInfo;

  constructor() {
    this.root = {
      name: '',
      version: '',
      dependencies: [],
    };
    this.dependencies = {};
    this.suggestions = [];
    this.pluginInfo = {};
  }
}
