import { gql } from '@apollo/client';
import { Link } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { LoadingView } from '../../components';
import { usePackageByNamePackageInfoQuery } from '../../graphql/generated/client';

gql`
  query PackageByNamePackageInfo($packageName: String!) {
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

  const { data, loading, error } = usePackageByNamePackageInfoQuery({
    variables: {
      packageName: name,
    },
  });

  if (loading) return <LoadingView />;
  if (error) return <p>Oh no... package error: {error.message}</p>;
  if (!data) return <p>Oh no... could not load package list</p>;

  return (
    <>
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
    </>
  );
};

export default Package;
