import { gql, useQuery } from '@apollo/client';
import {
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';

import Navbar from '../../components/Navbar';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

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

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load Suggestion</p>;

  return (
    <Layout title={data.suggestion.name}>
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
