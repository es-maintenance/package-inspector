import { gql } from '@apollo/client';
import { Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import { LoadingView } from '../../components';
import { usePackagesPackagesQuery } from '../../graphql/generated/client';

gql`
  query PackagesPackages {
    packages {
      id
      name
      version
      dependencyCount
    }
  }
`;

const Packages: NextPage = () => {
  const { data, loading, error } = usePackagesPackagesQuery();

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            columns={[
              {
                field: 'name',
                flex: 1,
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
              {
                field: 'version',
                flex: 1,
                renderCell(params) {
                  return (
                    <NextLink
                      href={`packages/${encodeURIComponent(params.value)}/${
                        params.row.version
                      }`}
                      passHref={true}
                    >
                      <Link>{params.value}</Link>
                    </NextLink>
                  );
                },
              },
              { field: 'count', flex: 1 },
            ]}
            rows={data.packages.map((dep) => {
              return {
                id: dep?.id,
                name: dep?.name,
                version: dep?.version,
                count: dep?.dependencyCount,
              };
            })}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default Packages;
