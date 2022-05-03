import { gql, useQuery } from '@apollo/client';
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
import { Link as LinkUI } from '@nextui-org/react';
import type { NextPage } from 'next';

import { Layout, LoadingView } from '../../components';
import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

type ColumnKey = 'name' | 'version' | 'dep-count' | 'dev-dep-count';

interface Column {
  key: ColumnKey;
  label: string;
}

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

interface PackageData {
  packages: NexusGenFieldTypes['Package'][];
}

const PackagesQuery = gql`
  query Packages {
    packages {
      name
      version
      dependencies {
        name
      }
    }
  }
`;

const Packages: NextPage = () => {
  const { data, loading, error } = useQuery<PackageData>(PackagesQuery);

  const {
    data: reportData,
    loading: loadingReport,
    error: reportError,
  } = useQuery<ReportData>(ReportQuery);

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
    <Layout title={reportData.report.root.name}>
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
                  key={dependency.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      href={`packages/${encodeURIComponent(dependency.name)}`}
                    >
                      <LinkUI>{dependency.name}</LinkUI>
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {dependency.version}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {/* FIXME: need to figure out why the types are not passing through */}
                    {(dependency as any).dependencies?.length}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Packages;
