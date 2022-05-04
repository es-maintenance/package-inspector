import type {
  Suggestion,
  ServerPlugin,
  SuggestionInput,
  SuggestionTask,
} from '@package-inspector/core';

import {
  NestedDependencyFreshness,
  NotBeingAbsorbedByTopLevel,
  PackagesWithExtraArtifacts,
  TopLevelDepsFreshness,
  PackagesWithPinnedVersions,
} from './suggestors';
export class TestPlugin implements ServerPlugin {
  name: string;
  version: string;
  pluginData: any;
  suggestions: Suggestion[];

  constructor() {
    this.name = 'Test Plugin';
    this.version = '0.0.1';

    this.suggestions = [];
    this.pluginData = {};
  }

  getTasks(): SuggestionTask[] {
    return [
      new PackagesWithPinnedVersions(),
      new NestedDependencyFreshness(),
      new NotBeingAbsorbedByTopLevel(),
      new PackagesWithExtraArtifacts(),
      new TopLevelDepsFreshness(),
    ];
  }
}

export default TestPlugin;
