import { gql } from '@apollo/client';
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

import { LoadingView } from '../../components';
import { useSuggestionsByIdSuggestionQuery } from '../../graphql/generated/client';

gql`
  query SuggestionsByIdSuggestion($suggestionId: String!) {
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

  const { data, loading, error } = useSuggestionsByIdSuggestionQuery({
    variables: { suggestionId: id },
  });

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load Suggestion</p>;

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {data?.suggestion?.message}
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
            {data?.suggestion?.actions
              ?.filter((a) => a !== null)
              .map((action, idx) => {
                return (
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Suggestion;
