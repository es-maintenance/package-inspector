import type { NextPage } from 'next';
import { Card, Grid, Loading, Text } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';

import { TestPlugin } from '@package-inspector/plugin-preset/browser';

import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';

import { Layout } from '../components/Layout';
import SuggestionOverview from '../components/SuggestionOverview';

export type Report = Pick<NexusGenFieldTypes['Report'], 'summary'> & {
  root: NexusGenFieldTypes['Package'];
  suggestions: NexusGenFieldTypes['Suggestion'][];
};

interface ReportData {
  report: Report;
}

const ReportQuery = gql`
  query {
    report {
      summary
      root {
        name
        version
        dependencies {
          id
        }
      }
      suggestions {
        id
        pluginTarget
        name
        message
        actions {
          message
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const testPlugin = new TestPlugin();

  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load report</p>;

  return (
    <Layout title={data.report.root.name}>
      {/* TODO: we need to talk about this */}
      <SuggestionOverview report={data.report} />

      <Grid.Container gap={2} justify={'center'}>
        <Grid sm={12} md={3}>
          <testPlugin.cardView
            suggestions={data.report.suggestions.filter(
              ({ pluginTarget }) =>
                pluginTarget === '@package-inspector/plugin-preset'
            )}
          />
        </Grid>

        {data &&
          data.report.suggestions.map(
            (suggestion) =>
              suggestion && (
                <Grid sm={12} md={3} key={suggestion.id}>
                  <Card>
                    <Text h4>{suggestion.name}</Text>
                    <Text>{suggestion.message}</Text>
                    <Card.Footer>
                      {suggestion.actions.length} actions
                    </Card.Footer>
                  </Card>
                </Grid>
              )
          )}
      </Grid.Container>
    </Layout>
  );
};

export default Home;
