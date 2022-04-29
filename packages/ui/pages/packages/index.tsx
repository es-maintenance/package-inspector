import type { NextPage } from 'next';
import Link from 'next/link';
import { Loading } from '@nextui-org/react';

import { gql, useQuery } from '@apollo/client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Layout } from '../../components/Layout';

import styles from './Packages.module.css';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

type ColumnKey = 'name' | 'version' | 'dep-count' | 'dev-dep-count';

export type Report = Pick<NexusGenFieldTypes['Report'], 'summary'> & {
  root: NexusGenFieldTypes['Package'];
  suggestions: NexusGenFieldTypes['Suggestion'][];
};

interface ReportData {
  report: Report;
}

const ReportQuery = gql`
  query {
    report {
      summary
      root {
        name
        version
        dependencies {
          id
          name
          version
          dependencies {
            name
            type
          }
        }
      }
    }
  }
`;

interface Column {
  key: ColumnKey;
  label: string;
}

interface Row {
  key: string;
  name: string;
  version: string;
  'dep-count': number;
  'dev-dep-count': number;
}

const Packages: NextPage = () => {
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
    // {
    //   key: 'dev-dep-count',
    //   label: 'DEV DEPENDENCIES',
    // },
  ];

  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <Loading />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load data from query.</p>;

  console.log(data);

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
            {data.report.root.dependencies.map((dependency) => {
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
