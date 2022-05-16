import { gql } from '@apollo/client';
import { Container, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { NextPage } from 'next';
import NextLink from 'next/link';
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
      <div style={{ height: 500, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={[
                { field: 'message', flex: 1 },
                {
                  field: 'packageName',
                  renderCell(params) {
                    return (
                      <NextLink
                        href={`packages/${encodeURIComponent(params.value)}`}
                        passHref={true}
                      >
                        <Link>{params.value}</Link>
                      </NextLink>
                    );
                  },
                },
              ]}
              rows={
                data?.suggestion?.actions.map((action, i) => {
                  return {
                    id: i,
                    message: action?.message || 'N/A',
                    packageName: action?.targetPackage?.name || 'N/A',
                  };
                }) || []
              }
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Suggestion;
