import type {
  Suggestion,
  ServerPlugin,
  SuggestionInput,
} from '@package-inspector/core';

import {
  nestedDependencyFreshness,
  notBeingAbsorbedByTopLevel,
  packagesWithExtraArtifacts,
  topLevelDepsFreshness,
  packagesWithPinnedVersions,
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

  async getSuggestions(
    suggestionInput: SuggestionInput
  ): Promise<Suggestion[]> {
    this.suggestions.push(await packagesWithPinnedVersions(suggestionInput));
    this.suggestions.push(await nestedDependencyFreshness(suggestionInput));
    this.suggestions.push(await notBeingAbsorbedByTopLevel(suggestionInput));
    this.suggestions.push(await packagesWithExtraArtifacts(suggestionInput));
    this.suggestions.push(await topLevelDepsFreshness(suggestionInput));

    return this.suggestions;
  }
}
