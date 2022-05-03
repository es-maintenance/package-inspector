import { gql, useQuery } from '@apollo/client';
import { Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { Link as LinkUI } from '@nextui-org/react';
import type { NextPage } from 'next';
import Link from 'next/link';

import { CardView, Layout, LoadingView } from '../components';
import { NexusGenFieldTypes } from '../graphql/generated/nexus-typegen';
import { PluginProvider } from '../lib/PluginProvider';

export type Report = Pick<NexusGenFieldTypes['Report'], 'summary'> & {
  root: NexusGenFieldTypes['Package'];
  top: NexusGenFieldTypes['Top'][];
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
      topSuggestions {
        count
        package {
          id
          version
          name
        }
      }
      suggestions {
        id
        pluginTarget
        name
        message
        count
      }
    }
  }
`;

interface SuggestionOverviewProps {
  topSuggestions: NexusGenFieldTypes['TopSuggestions'][];
  summary: string;
}

const SuggestionOverview: React.FC<SuggestionOverviewProps> = (props) => {
  const { topSuggestions, summary } = props;

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Grid container>
        <Grid item xs>
          <Typography>{summary}</Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ m: 2 }} />
        <Grid item xs>
          <Typography>
            The top {topSuggestions.length.toLocaleString()} with the most
            suggestions are:
          </Typography>
          <ul>
            {topSuggestions.map((dep, i) => {
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
      </Grid>
    </Container>
  );
};

const Home: NextPage = () => {
  // TODO: talk to Lewis about making this a hook?
  const pluginProvider = new PluginProvider();

  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load report</p>;

  return (
    <Layout
      title={data.report.root.name}
      belowNavbarArea={
        <Paper variant="outlined" square={true}>
          <Container maxWidth="lg">
            <br />
            <Typography variant="h2" align="center">
              {data.report.root.name}
            </Typography>
            <br />
            <SuggestionOverview
              summary={data.report.summary}
              topSuggestions={data.report.topSuggestions}
            />
          </Container>
        </Paper>
      }
    >
      <Container maxWidth="md">
        <Grid
          sx={{ flexGrow: 1 }}
          container
          spacing={2}
          justifyContent="center"
        >
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
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
