import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

import { Layout, LoadingView } from '../../components';

import { NexusGenFieldTypes } from '../../graphql/generated/nexus-typegen';

interface PackageData {
  package: NexusGenFieldTypes['PackageCompound'][];
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

const PackageQuery = gql`
  query Package($packageName: String!) {
    package(packageName: $packageName) {
      name
      latest
      variants {
        id
        version
        name
      }
    }
  }
`;

const Package: NextPage = () => {
  const router = useRouter();
  let { name } = router.query;

  if (!name) {
    name = '';
  } else if (Array.isArray(name)) {
    name = name.join();
  }

  const { data, loading, error } = useQuery<PackageData>(PackageQuery, {
    variables: {
      packageName: name,
    },
  });

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

  return (
    <Layout title={reportData.report.root.name}>
      <h1>Package: {name}</h1>
      {/* Why aren't the types  */}
      <h3>Versions:</h3>
      <ul>
        {(data.package as any).variants.map((variant: any) => {
          return (
            <li key={variant.id}>
              <Link href={`/packages/${variant.name}/${variant.version}`}>
                {variant.version}
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Package;
