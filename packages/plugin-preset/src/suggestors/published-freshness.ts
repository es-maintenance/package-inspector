import {
  type SuggestionInput,
  type SuggestionAction,
  type Suggestion,
  SuggestionTask,
} from '@package-inspector/core';

import Piscina from 'piscina';

import { resolve } from 'path';

const piscina = new Piscina({
  filename: resolve(__dirname, '../workers/get-days-published.js'),
});

export class PublishedFreshness extends SuggestionTask {
  name = 'Published Freshness';

  async task({ latestPackages }: SuggestionInput): Promise<Suggestion> {
    const publishedArtifacts: SuggestionAction[] = [];

    if (latestPackages) {
      const promiseWork = Object.keys(latestPackages).map((name) => {
        return new Promise((resolve) => {
          const version = latestPackages[name];

          piscina
            .run({ name, version })
            .then((days) => {
              if (days > 30) {
                publishedArtifacts.push({
                  message: `${name}@${version} (the latest package for ${name}) has not been published in ${days} days.`,
                  targetPackageId: `${name}@${version}`,
                });
              }

              resolve(name);
            })
            .finally(() => {
              resolve(name);
            });
        });
      });

      await Promise.all(promiseWork);
    }

    return {
      id: 'publishedFreshness',
      pluginTarget: '@package-inspector/plugin-preset',
      name: 'Packages with latest published longest time from now',
      message: `There are currently ${publishedArtifacts.length.toLocaleString()} published longer than 30 days`,
      actions: publishedArtifacts,
    };
  }
}
