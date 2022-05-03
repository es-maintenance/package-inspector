import { gql, useQuery } from '@apollo/client';
import { Grid } from '@nextui-org/react';
import type { NextPage } from 'next';

import {
  CardView,
  Layout,
  LoadingView,
  SuggestionOverview,
} from '../components';
import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';
import { PluginProvider } from '../lib/PluginProvider';

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
          targetPackage {
            id
            name
            version
          }
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  // TODO: talk to Lewis about making this a hook?
  const pluginProvider = new PluginProvider();

  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load report</p>;

  return (
    <Layout title={data.report.root.name}>
      <SuggestionOverview report={data.report} />

      <Grid.Container gap={2} justify={'center'}>
        {data &&
          data.report.suggestions.map((suggestion) => {
            const CustomCardView = pluginProvider.cardView(
              suggestion.pluginTarget
            );
            if (CustomCardView) {
              return <CustomCardView suggestion={suggestion} />;
            } else {
              return <CardView suggestion={suggestion} />;
            }
          })}
      </Grid.Container>
    </Layout>
  );
};

export default Home;
