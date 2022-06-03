import { gql } from '@apollo/client';
import { Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { LoadingView } from '../../components';
import { usePackagesPackagesQuery } from '../../graphql/generated/client';

gql`
  query PackagesPackages($first: Int, $after: String) {
    packages(first: $first, after: $after) {
      totalCount
      nodes {
        id
        name
        version
        dependencyCount
      }
      pageInfo {
        endCursor
        hasPreviousPage
        startCursor
        hasNextPage
      }
    }
  }
`;

const Packages: NextPage = () => {
  const PAGE_SIZE = 100;

  const mapPageToNextCursor = useRef<{ [page: number]: string }>({
    0: 'null',
  });

  const [page, setPage] = useState(1);

  const { data, loading, error } = usePackagesPackagesQuery({
    variables: {
      first: PAGE_SIZE,
      after: mapPageToNextCursor.current[page],
    },
  });

  mapPageToNextCursor.current[page + 1] =
    data?.packages.pageInfo.endCursor || 'null';

  const [rowCountState, setRowCountState] = useState(
    data?.packages?.totalCount || 0
  );

  useEffect(() => {
    return setRowCountState(
      (data?.packages?.totalCount !== undefined
        ? data?.packages?.totalCount
        : rowCountState) || 0
    );
  }, [data?.packages?.totalCount, rowCountState, setRowCountState]);

  const handlePageChange = (newPage: number) => {
    if (data?.packages.pageInfo.hasNextPage) {
      setPage(newPage);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  return (
    <div style={{ height: '80vh', width: '100%' }}>
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
                      href={`packages/${encodeURIComponent(
                        params.row.name || ''
                      )}/${params.row.version}`}
                      passHref={true}
                    >
                      <Link>{params.value}</Link>
                    </NextLink>
                  );
                },
              },
              { field: 'count', flex: 1 },
            ]}
            rows={
              data.packages?.nodes?.map((dep) => {
                return {
                  id: dep?.id,
                  name: dep?.name,
                  version: dep?.version,
                  count: dep?.dependencyCount,
                };
              }) || []
            }
            disableColumnFilter
            disableColumnSelector
            rowCount={rowCountState}
            page={page}
            pageSize={PAGE_SIZE}
            paginationMode="server"
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Packages;
