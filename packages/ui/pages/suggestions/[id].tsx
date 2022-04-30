import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout, LoadingView } from '../../components';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';
interface ReportData {
  report: Pick<NexusGenFieldTypes['Report'], 'summary'> & {
    root: NexusGenFieldTypes['Package'];
  };
}

const ReportQuery = gql`
  query {
    report {
      root {
        name
      }
    }
  }
`;

interface SuggestionData {
  suggestion: NexusGenFieldTypes['Suggestion'];
}

const SuggestionQuery = gql`
  query GetSuggestion($suggestionId: String!) {
    suggestion(id: $suggestionId) {
      id
      message
      name
      pluginTarget
      actions {
        message
        targetPackage {
          name
        }
      }
    }
  }
`;

const Suggestion: NextPage = () => {
  const router = useRouter();
  let { id } = router.query;

  if (!id) {
    id = '';
  } else if (Array.isArray(id)) {
    id = id.join();
  }

  const { data, loading, error } = useQuery<
    SuggestionData,
    { suggestionId: string }
  >(SuggestionQuery, { variables: { suggestionId: id } });

  const {
    data: reportData,
    loading: loadingReport,
    error: reportError,
  } = useQuery<ReportData>(ReportQuery);

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load Suggestion</p>;

  if (loadingReport) return <LoadingView />;
  if (reportError) return <p>Oh no... {reportError.message}</p>;
  if (!reportData) return <p>Oh no... could not load Report</p>;

  return (
    <Layout title={reportData.report.root.name}>
      <Container sx={{ py: 8 }} maxWidth="md">
        {data.suggestion.message}
        <br />
        <br />
        <h2>Actions</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="actions table">
            <TableHead>
              <TableRow>
                <TableCell>Message</TableCell>
                <TableCell align="right">Package</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.suggestion.actions
                .filter((a) => a !== null)
                .map((action, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {action?.message}
                    </TableCell>
                    <TableCell align="right">
                      {action?.targetPackage?.name ? (
                        <Link
                          href={`/packages/${encodeURIComponent(
                            action.targetPackage.name
                          )}`}
                        >
                          {action.targetPackage.name}
                        </Link>
                      ) : (
                        'None'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
};

export default Suggestion;
