import { gql, useQuery } from '@apollo/client';
import { Link } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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
        parent {
          id
          name
          version
        }
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
  if (error) return <p>Oh no... package error: {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  if (loadingReport) return <LoadingView />;
  if (reportError) return <p>Oh no... report error: {reportError.message}</p>;
  if (!reportData) return <p>Oh no... could not load Report</p>;

  return (
    <Layout title={reportData.report.root.name}>
      <h1>Package: {name}</h1>
      {/* Why aren't the types  */}
      <h3>Versions:</h3>
      {(data.package as any).variants.map((variant: any) => {
        return (
          <div key={variant.id}>
            <NextLink
              href={`/packages/${encodeURIComponent(variant.name)}/${
                variant.version
              }`}
            >
              {variant.version}
            </NextLink>

            {variant.parent.length > 0 ? (
              <>
                <h3>Packages that depend on this</h3>
                <ul>
                  {/* FIXME: why don't the types pass down */}
                  {variant.parent.map((parent: any) => {
                    return (
                      <li key={parent.id}>
                        <NextLink
                          href={`/packages/${encodeURIComponent(parent.name)}/${
                            parent.version
                          }`}
                          passHref={true}
                        >
                          <Link>{`${parent.name}@${parent.version}`}</Link>
                        </NextLink>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <i>This is a top level dependency</i>
            )}
            <hr />
          </div>
        );
      })}
    </Layout>
  );
};

export default Package;
