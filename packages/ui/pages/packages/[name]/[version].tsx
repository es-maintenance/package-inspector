import { gql } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { LoadingView } from '../../../components';
import { usePackagesByNameAndVersionPackageQuery } from '../../../graphql/generated/client';

gql`
  query PackagesByNameAndVersionPackage(
    $packageName: String!
    $packageVersion: String!
  ) {
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
      suggestions(first: 10) {
        nodes {
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

  const { data, loading, error } = usePackagesByNameAndVersionPackageQuery({
    variables: {
      packageName: name,
      packageVersion: version,
    },
  });

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  return (
    <>
      <h1>Package: {name}</h1>
      <pre>{JSON.stringify(data.packageByVersion, null, 4)}</pre>
    </>
  );
};

export default Package;
