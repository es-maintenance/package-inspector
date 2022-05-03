import { Grid, Link as LinkUI } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';
import { Report } from '../pages/index';
import styles from './SuggestionOverview.module.css';

interface SuggestionCount {
  packageName: string;
  count: number;
}

function getCostlyPackages(
  suggestions: NexusGenFieldTypes['Suggestion'][],
  count = 5
): SuggestionCount[] {
  const countMap: Record<string, SuggestionCount> = {};

  // TODO: we can use a priority queue (with max `count` items) instead of blindly pushing and sorting at the end
  const counts: SuggestionCount[] = [];

  suggestions.forEach((suggestion) => {
    suggestion.actions.forEach((action) => {
      // FIXME: again not sure why this is not getting the right type information
      const id = (action as any).targetPackage.id;

      if (id) {
        if (!countMap[id]) {
          console.log(`Missed: ${id}`);
          const suggestionCount = {
            packageName: id,
            count: 1,
          };
          countMap[id] = suggestionCount;
          counts.push(suggestionCount);
        } else {
          countMap[id].count++;
        }
      }
    });
  });

  return counts.sort((a, b) => b.count - a.count).slice(0, count);
}

interface SuggestionOverviewProps {
  report: Report;
}

export const SuggestionOverview: React.FC<SuggestionOverviewProps> = (
  props
) => {
  const { report } = props;
  const { suggestions } = report;

  const heaviestDeps = getCostlyPackages(suggestions);

  return (
    <section>
      <h1>Suggestion Overview</h1>
      <Grid.Container gap={2} justify="center">
        <Grid xs>
          <p>{report.summary}</p>
        </Grid>
        <Grid
          xs
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>
            The top {heaviestDeps.length.toLocaleString()} with the most
            suggestions are:
          </p>
          <ul className={styles.suggestionOverviewCostlyDepsList}>
            {heaviestDeps.map((dep, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`packages/${encodeURIComponent(dep.packageName)}`}
                    passHref={true}
                  >
                    <LinkUI>{dep.packageName}</LinkUI>
                  </Link>{' '}
                  with {dep.count.toLocaleString()} suggestions
                </li>
              );
            })}
          </ul>
        </Grid>
      </Grid.Container>
    </section>
  );
};
