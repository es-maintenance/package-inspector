import type { NextPage } from 'next';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';

import styles from '../styles/Report.module.css';

interface Package {
  name: string;
  version: string;
  dependencies: Package[];
  devDependencies: Package[];
}

interface Report {
  package: Package;
}

const ReportQuery = gql`
  query {
    report {
      package {
        name
        version
        dependencies {
          name
          version
        }
        devDependencies {
          name
          version
        }
      }
    }
  }
`;

const Report: NextPage = () => {
  const { data, loading, error } = useQuery<Report>(ReportQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <h1>Report: {data?.package.name}</h1>
      <h2>
        <Link href="/" passHref={true}>
          <LinkUI>Back to home</LinkUI>
        </Link>
      </h2>
      <h2>Dependencies:</h2>
      <table className={styles.packageTable}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>VERSION</th>
          </tr>
        </thead>
        <tbody>
          {data?.package.dependencies.map((dep) => (
            <tr className={styles.packageTableRow} key={dep.name}>
              <td>{dep.name}</td>
              <td>{dep.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Report;
