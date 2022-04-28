import React from 'react';
import type {
  Suggestion,
  Package,
  DependenciesMap,
} from '@package-inspector/core';
import Link from 'next/link';
import { Grid, Link as LinkUI } from '@nextui-org/react';

import { Report } from '../pages/index';

import styles from '../styles/SuggestionOverview.module.css';

interface SuggestionCount {
  packageName: string;
  count: number;
}

function getCostlyPackages(
  suggestions: Suggestion[],
  count = 5
): SuggestionCount[] {
  const countMap: Record<string, SuggestionCount> = {};

  // TODO: we can use a priority queue (with max `count` items) instead of blindly pushing and sorting at the end
  const counts: SuggestionCount[] = [];

  suggestions.forEach((suggestion) => {
    suggestion.actions.forEach((action) => {
      const node = action.targetPackage;

      // if (parts.length) {
      //   const associatedActionPackageName = parts[0];
      //   if (!countMap[associatedActionPackageName]) {
      //     console.log(`Missed: ${associatedActionPackageName}`);
      //     const suggestionCount = {
      //       packageName: associatedActionPackageName,
      //       count: 1,
      //     };
      //     countMap[associatedActionPackageName] = suggestionCount;
      //     counts.push(suggestionCount);
      //   } else {
      //     countMap[associatedActionPackageName].count++;
      //   }
      // }
    });
  });

  return counts.sort((a, b) => b.count - a.count).slice(0, count);
}

interface SuggestionOverviewProps {
  report: Report;
}

const SuggestionOverview: React.FC<SuggestionOverviewProps> = (props) => {
  const { report } = props;
  // const { suggestions } = report;

  // FIXME: needs to be this
  // const directDeps = report.root.dependencies;
  const directDeps = report.dependencies;

  // FIXME: need to actually get costly packages
  // const heaviestDeps = getCostlyPackages(suggestions);
  const heaviestDeps = getCostlyPackages([]);

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
            Out of the {directDeps.length.toLocaleString()} top level
            dependencies. The top {heaviestDeps.length.toLocaleString()} with
            the most suggestions are:
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

export default SuggestionOverview;
