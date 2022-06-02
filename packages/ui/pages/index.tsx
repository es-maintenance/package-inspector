import { gql } from '@apollo/client';
import {
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';

import { CardView, Layout, LoadingView } from '../components';
import {
  IndexPageTopSuggestionFragment,
  useIndexReportQuery,
} from '../graphql/generated/client';
import { usePluginProvider } from '../hooks';
import { NextPageWithLayout } from '../next-types';

gql`
  fragment CardViewSuggestions on Suggestion {
    id
    pluginTarget
    name
    message
    count
  }

  fragment IndexPageTopSuggestion on TopSuggestions {
    count
    package {
      id
      version
      name
    }
  }

  query IndexReport {
    report {
      summary
      root {
        name
        version
      }
      topSuggestions(first: 5) {
        nodes {
          ...IndexPageTopSuggestion
        }
      }
      suggestions(first: 10) {
        nodes {
          ...CardViewSuggestions
        }
      }
    }
  }
`;

interface SuggestionOverviewProps {
  topSuggestions: Array<IndexPageTopSuggestionFragment | null>;
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
            The top {topSuggestions?.length.toLocaleString()} with the most
            suggestions are:
          </Typography>
          <ul>
            {topSuggestions?.map((dep, i) => {
              if (!dep) return <></>;

              return (
                <li key={i}>
                  <NextLink
                    href={`packages/${encodeURIComponent(dep.package.name)}/${
                      dep.package.version
                    }`}
                    passHref={true}
                  >
                    <Link>{dep.package.id}</Link>
                  </NextLink>{' '}
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

const Home: NextPageWithLayout = () => {
  const pluginProvider = usePluginProvider();

  const { data, loading, error } = useIndexReportQuery();

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load report</p>;

  return (
    <Layout
      hero={() => {
        return (
          <Paper variant="outlined" square={true}>
            <Container maxWidth="lg">
              <br />
              <Typography variant="h2" align="center">
                {data.report.root.name}
              </Typography>
              <br />
              <SuggestionOverview
                summary={data.report.summary}
                topSuggestions={data.report.topSuggestions.nodes || []}
              />
            </Container>
          </Paper>
        );
      }}
    >
      <Container maxWidth="md">
        <Grid
          sx={{ flexGrow: 1 }}
          container
          spacing={2}
          justifyContent="center"
        >
          {data &&
            data.report.suggestions?.nodes?.map((suggestion, idx) => {
              if (!suggestion) return <></>;

              const CustomCardView = pluginProvider?.cardView(
                suggestion.pluginTarget
              );
              if (CustomCardView) {
                return (
                  <CustomCardView suggestion={suggestion} key={suggestion.id} />
                );
              } else {
                return <CardView suggestion={suggestion} key={suggestion.id} />;
              }
            })}
        </Grid>
      </Container>
    </Layout>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <>{page}</>;
};

export default Home;
