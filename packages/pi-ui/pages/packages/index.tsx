import type { NextPage } from 'next';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/react';

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
    <>
      <h1>Packages</h1>
      <h2>
        <Link href="/" passHref={true}>
          <LinkUI>Back to home</LinkUI>
        </Link>
      </h2>
      <table className={styles.packageTable}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className={styles.packageTableRow} key={row.key}>
              {columns.map((column) => (
                <td key={`${row.key}${column.key}`}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Packages;
