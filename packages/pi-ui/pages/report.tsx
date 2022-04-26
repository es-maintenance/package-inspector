import type { NextPage } from 'next';
import Link from 'next/link';
import { Link as LinkUI } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';

import styles from '../styles/Report.module.css';

interface Package {
  name: string;
  version: string;
  type: string;
  dependencies: Package[];
}

interface Report {
  package: Package;
}

interface ReportData {
  report: Report;
}

const ReportQuery = gql`
  query {
    report {
      package {
        name
        version
        dependencies {
          name
          type
          version
        }
      }
    }
  }
`;

const Report: NextPage = () => {
  const { data, loading, error } = useQuery<ReportData>(ReportQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <h1>Report: {data?.report.package.name}</h1>
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
            <th>TYPE</th>
          </tr>
        </thead>
        <tbody>
          {data?.report.package.dependencies.map((dep) => (
            <tr className={styles.packageTableRow} key={dep.name}>
              <td>
                <Link
                  href={`packages/${encodeURIComponent(dep.name)}`}
                  passHref={true}
                >
                  <LinkUI>{dep.name}</LinkUI>
                </Link>
              </td>
              <td>{dep.version}</td>
              <td>{dep.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Report;
