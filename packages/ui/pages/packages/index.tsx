import type { NextPage } from 'next';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Layout } from '../../components/Layout';

import styles from './Packages.module.css';

type ColumnKey = 'name' | 'version' | 'dep-count' | 'dev-dep-count';

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
    {
      key: 'dev-dep-count',
      label: 'DEV DEPENDENCIES',
    },
  ];
  // FIXME: should be passed in
  const rows: Row[] = [
    {
      key: '1',
      name: 'react',
      version: '18.0.0',
      'dep-count': 30,
      'dev-dep-count': 50,
    },
    {
      key: '2',
      name: 'react-dom',
      version: '18.0.0',
      'dep-count': 23,
      'dev-dep-count': 56,
    },
    {
      key: '3',
      name: 'tailwind',
      version: '3.0.0',
      'dep-count': 1,
      'dev-dep-count': 3,
    },
    {
      key: '4',
      name: 'next',
      version: '12.1.5',
      'dep-count': 12,
      'dev-dep-count': 40,
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
            {rows.map((row) => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell
                    component="th"
                    scope="row"
                    key={`${row.key}${column.key}`}
                  >
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Packages;
