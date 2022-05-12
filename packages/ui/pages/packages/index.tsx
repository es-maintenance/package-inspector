import { gql } from '@apollo/client';
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import { LoadingView } from '../../components';
import {
  usePackagesPackagesQuery,
  usePackagesReportQuery,
} from '../../graphql/generated';

type ColumnKey = 'name' | 'version' | 'dep-count' | 'dev-dep-count';

interface Column {
  key: ColumnKey;
  label: string;
}

gql`
  query PackagesReport {
    report {
      root {
        name
      }
    }
  }
`;

const PackagesQuery = gql`
  query PackagesPackages {
    packages {
      id
      name
      version
      dependencies {
        name
      }
    }
  }
`;

const Packages: NextPage = () => {
  const { data, loading, error } = usePackagesPackagesQuery();

  const {
    data: reportData,
    loading: loadingReport,
    error: reportError,
  } = usePackagesReportQuery();

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  if (loadingReport) return <LoadingView />;
  if (reportError) return <p>Oh no... {reportError.message}</p>;
  if (!reportData) return <p>Oh no... could not load Report</p>;

  const columns: Column[] = [
    {
      key: 'name',
      label: 'NAME',
    },
    {
      key: 'version',
      label: 'VERSION',
    },
    {
      key: 'dep-count',
      label: 'DEPENDENCIES',
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.packages.map((dependency) => {
            if (!dependency) return;

            return (
              <TableRow
                key={dependency.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <NextLink
                    href={`packages/${encodeURIComponent(dependency.name)}`}
                    passHref={true}
                  >
                    <Link>{dependency.name}</Link>
                  </NextLink>
                </TableCell>
                <TableCell component="th" scope="row">
                  {dependency.version}
                </TableCell>
                <TableCell component="th" scope="row">
                  {dependency.dependencies.length}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Packages;
