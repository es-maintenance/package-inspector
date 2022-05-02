import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import { Layout, LoadingView } from '../../../components';

import { NexusGenFieldTypes } from '../../../graphql/generated/nexus-typegen';

interface PackageData {
  package: NexusGenFieldTypes['Package'][];
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
  query ($packageName: String!, $packageVersion: String!) {
    packageByVersion(
      packageName: $packageName
      packageVersion: $packageVersion
    ) {
      id
      name
      version
      metadata {
        size {
          physical
          files
        }
      }
      suggestions {
        id
        message
        actions {
          message
          targetPackage {
            id
          }
        }
      }
    }
  }
`;

const Package: NextPage = () => {
  const router = useRouter();
  let { name, version } = router.query;

  if (!name) {
    name = '';
  } else if (Array.isArray(name)) {
    name = name.join();
  }

  if (!version) {
    version = '';
  } else if (Array.isArray(version)) {
    version = version.join();
  }

  const { data, loading, error } = useQuery<PackageData>(PackageQuery, {
    variables: {
      packageName: name,
      packageVersion: version,
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
      <pre>{JSON.stringify((data as any).packageByVersion, null, 4)}</pre>
    </Layout>
  );
};

export default Package;
