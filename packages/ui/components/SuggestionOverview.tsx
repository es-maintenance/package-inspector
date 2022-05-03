import { Grid, Link as LinkUI } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';
import styles from './SuggestionOverview.module.css';

interface SuggestionOverviewProps {
  top: NexusGenFieldTypes['Top'][];
  summary: string;
}

export const SuggestionOverview: React.FC<SuggestionOverviewProps> = (
  props
) => {
  const { top, summary } = props;

  return (
    <section>
      <h1>Suggestion Overview</h1>
      <Grid.Container gap={2} justify="center">
        <Grid xs>
          <p>{summary}</p>
        </Grid>
        <Grid
          xs
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p>
            The top {top.length.toLocaleString()} with the most suggestions are:
          </p>
          <ul className={styles.suggestionOverviewCostlyDepsList}>
            {top.map((dep, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`packages/${encodeURIComponent(dep.package.name)}/${
                      dep.package.version
                    }`}
                    passHref={true}
                  >
                    <LinkUI>{dep.package.id}</LinkUI>
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
