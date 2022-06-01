import { performance } from 'perf_hooks';

import { Suggestion } from '../models';
import { SuggestionInput } from '../types';

export abstract class SuggestionTask {
  name = '';
  elapsedTime = 0;

  abstract task(suggestionInput: SuggestionInput): Promise<Suggestion>;

  // Handles running the task and getting the elapsed time of the task
  async run(suggestionInput: SuggestionInput): Promise<Suggestion> {
    if (typeof this?.task !== 'function') {
      throw new Error(
        'Please implement task on your subclass of SuggestionTask'
      );
    }

    if (this?.name === '') {
      throw new Error(
        'Please implement name on your subclass of SuggestionTask'
      );
    }

    const start = performance.now();
    const suggestion = await this.task(suggestionInput);
    const end = performance.now();

    this.elapsedTime = end - start;

    return suggestion;
  }
}
