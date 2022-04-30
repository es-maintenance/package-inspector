import type { NextPage } from 'next';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { gql, useQuery } from '@apollo/client';

import styles from './Packages.module.css';
import { Layout, LoadingView } from '../../components';
import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

type ColumnKey = 'name' | 'version' | 'dep-count' | 'dev-dep-count';

interface Column {
  key: ColumnKey;
  label: string;
}

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

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

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
    // FIXME: should be the name of the report
    <Layout title="Packages">
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
                    {dependency.name}
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
