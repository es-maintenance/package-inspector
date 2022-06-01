import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MiniPackage = {
  __typename?: 'MiniPackage';
  name: Scalars['String'];
  version: Scalars['String'];
};

export type Package = {
  __typename?: 'Package';
  dependencies: Array<Maybe<Package>>;
  dependencyCount: Scalars['Int'];
  funding?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<PackageMetadata>;
  name: Scalars['String'];
  parent: Array<Maybe<Package>>;
  suggestions: Array<Maybe<Suggestion>>;
  type?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type PackageCompound = {
  __typename?: 'PackageCompound';
  latest: Scalars['String'];
  name: Scalars['String'];
  variants: Array<Maybe<Package>>;
};

export type PackageMetadata = {
  __typename?: 'PackageMetadata';
  pathsOnDisk?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<SizeInfo>;
};

export type Query = {
  __typename?: 'Query';
  package?: Maybe<PackageCompound>;
  packageByVersion?: Maybe<Package>;
  packages: Array<Maybe<Package>>;
  report: Report;
  suggestion?: Maybe<Suggestion>;
  title: Scalars['String'];
};

export type QuerypackageArgs = {
  packageName: Scalars['String'];
};

export type QuerypackageByVersionArgs = {
  packageName: Scalars['String'];
  packageVersion: Scalars['String'];
};

export type QuerysuggestionArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  dependencies: Array<Maybe<Package>>;
  id: Scalars['ID'];
  latestPackages: Array<Maybe<MiniPackage>>;
  root: Package;
  suggestions: Array<Maybe<Suggestion>>;
  summary: Scalars['String'];
  topSuggestions: Array<Maybe<TopSuggestions>>;
};

export type SizeInfo = {
  __typename?: 'SizeInfo';
  files?: Maybe<Scalars['Int']>;
  physical?: Maybe<Scalars['Int']>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  actions: Array<Maybe<SuggestionAction>>;
  count: Scalars['Int'];
  id: Scalars['ID'];
  message: Scalars['String'];
  name: Scalars['String'];
  pluginTarget: Scalars['String'];
};

export type SuggestionAction = {
  __typename?: 'SuggestionAction';
  message: Scalars['String'];
  priority?: Maybe<Scalars['Int']>;
  targetPackage?: Maybe<Package>;
  targetPackageId: Scalars['String'];
};

export type TopSuggestions = {
  __typename?: 'TopSuggestions';
  count: Scalars['Int'];
  package: Package;
};

export type NavbarTitleQueryVariables = Exact<{ [key: string]: never }>;

export type NavbarTitleQuery = { __typename?: 'Query'; title: string };

export type DetailsReportQueryVariables = Exact<{ [key: string]: never }>;

export type DetailsReportQuery = {
  __typename?: 'Query';
  report: {
    __typename?: 'Report';
    summary: string;
    root: {
      __typename?: 'Package';
      name: string;
      version: string;
      dependencies: Array<{
        __typename?: 'Package';
        id: string;
        name: string;
        version: string;
        type?: string | null;
        metadata?: {
          __typename?: 'PackageMetadata';
          size?: {
            __typename?: 'SizeInfo';
            files?: number | null;
            physical?: number | null;
          } | null;
        } | null;
      } | null>;
    };
  };
};

export type CardViewSuggestionsFragment = {
  __typename?: 'Suggestion';
  id: string;
  pluginTarget: string;
  name: string;
  message: string;
  count: number;
};

export type IndexPageTopSuggestionFragment = {
  __typename?: 'TopSuggestions';
  count: number;
  package: {
    __typename?: 'Package';
    id: string;
    version: string;
    name: string;
  };
};

export type IndexReportQueryVariables = Exact<{ [key: string]: never }>;

export type IndexReportQuery = {
  __typename?: 'Query';
  report: {
    __typename?: 'Report';
    summary: string;
    root: {
      __typename?: 'Package';
      name: string;
      version: string;
      dependencies: Array<{ __typename?: 'Package'; id: string } | null>;
    };
    topSuggestions: Array<{
      __typename?: 'TopSuggestions';
      count: number;
      package: {
        __typename?: 'Package';
        id: string;
        version: string;
        name: string;
      };
    } | null>;
    suggestions: Array<{
      __typename?: 'Suggestion';
      id: string;
      pluginTarget: string;
      name: string;
      message: string;
      count: number;
    } | null>;
  };
};

export type PackageByNamePackageInfoQueryVariables = Exact<{
  packageName: Scalars['String'];
}>;

export type PackageByNamePackageInfoQuery = {
  __typename?: 'Query';
  package?: {
    __typename?: 'PackageCompound';
    name: string;
    latest: string;
    variants: Array<{
      __typename?: 'Package';
      id: string;
      version: string;
      name: string;
      parent: Array<{
        __typename?: 'Package';
        id: string;
        name: string;
        version: string;
      } | null>;
    } | null>;
  } | null;
};

export type PackagesByNameAndVersionPackageQueryVariables = Exact<{
  packageName: Scalars['String'];
  packageVersion: Scalars['String'];
}>;

export type PackagesByNameAndVersionPackageQuery = {
  __typename?: 'Query';
  packageByVersion?: {
    __typename?: 'Package';
    id: string;
    name: string;
    version: string;
    metadata?: {
      __typename?: 'PackageMetadata';
      size?: {
        __typename?: 'SizeInfo';
        physical?: number | null;
        files?: number | null;
      } | null;
    } | null;
    suggestions: Array<{
      __typename?: 'Suggestion';
      id: string;
      message: string;
      actions: Array<{
        __typename?: 'SuggestionAction';
        message: string;
        targetPackage?: { __typename?: 'Package'; id: string } | null;
      } | null>;
    } | null>;
  } | null;
};

export type PackagesPackagesQueryVariables = Exact<{ [key: string]: never }>;

export type PackagesPackagesQuery = {
  __typename?: 'Query';
  packages: Array<{
    __typename?: 'Package';
    id: string;
    name: string;
    version: string;
    dependencyCount: number;
  } | null>;
};

export type SuggestionsByIdSuggestionQueryVariables = Exact<{
  suggestionId: Scalars['String'];
}>;

export type SuggestionsByIdSuggestionQuery = {
  __typename?: 'Query';
  suggestion?: {
    __typename?: 'Suggestion';
    id: string;
    message: string;
    name: string;
    pluginTarget: string;
    actions: Array<{
      __typename?: 'SuggestionAction';
      message: string;
      targetPackage?: { __typename?: 'Package'; name: string } | null;
    } | null>;
  } | null;
};

export const CardViewSuggestionsFragmentDoc = gql`
  fragment CardViewSuggestions on Suggestion {
    id
    pluginTarget
    name
    message
    count
  }
`;
export const IndexPageTopSuggestionFragmentDoc = gql`
  fragment IndexPageTopSuggestion on TopSuggestions {
    count
    package {
      id
      version
      name
    }
  }
`;
export const NavbarTitleDocument = gql`
  query NavbarTitle {
    title
  }
`;

/**
 * __useNavbarTitleQuery__
 *
 * To run a query within a React component, call `useNavbarTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavbarTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavbarTitleQuery({
 *   variables: {
 *   },
 * });
 */
export function useNavbarTitleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    NavbarTitleQuery,
    NavbarTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NavbarTitleQuery, NavbarTitleQueryVariables>(
    NavbarTitleDocument,
    options
  );
}
export function useNavbarTitleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NavbarTitleQuery,
    NavbarTitleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NavbarTitleQuery, NavbarTitleQueryVariables>(
    NavbarTitleDocument,
    options
  );
}
export type NavbarTitleQueryHookResult = ReturnType<typeof useNavbarTitleQuery>;
export type NavbarTitleLazyQueryHookResult = ReturnType<
  typeof useNavbarTitleLazyQuery
>;
export type NavbarTitleQueryResult = Apollo.QueryResult<
  NavbarTitleQuery,
  NavbarTitleQueryVariables
>;
export const DetailsReportDocument = gql`
  query DetailsReport {
    report {
      summary
      root {
        name
        version
        dependencies {
          id
          name
          version
          type
          metadata {
            size {
              files
              physical
            }
          }
        }
      }
    }
  }
`;

/**
 * __useDetailsReportQuery__
 *
 * To run a query within a React component, call `useDetailsReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useDetailsReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDetailsReportQuery({
 *   variables: {
 *   },
 * });
 */
export function useDetailsReportQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DetailsReportQuery,
    DetailsReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DetailsReportQuery, DetailsReportQueryVariables>(
    DetailsReportDocument,
    options
  );
}
export function useDetailsReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DetailsReportQuery,
    DetailsReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DetailsReportQuery, DetailsReportQueryVariables>(
    DetailsReportDocument,
    options
  );
}
export type DetailsReportQueryHookResult = ReturnType<
  typeof useDetailsReportQuery
>;
export type DetailsReportLazyQueryHookResult = ReturnType<
  typeof useDetailsReportLazyQuery
>;
export type DetailsReportQueryResult = Apollo.QueryResult<
  DetailsReportQuery,
  DetailsReportQueryVariables
>;
export const IndexReportDocument = gql`
  query IndexReport {
    report {
      summary
      root {
        name
        version
        dependencies {
          id
        }
      }
      topSuggestions {
        ...IndexPageTopSuggestion
      }
      suggestions {
        ...CardViewSuggestions
      }
    }
  }
  ${IndexPageTopSuggestionFragmentDoc}
  ${CardViewSuggestionsFragmentDoc}
`;

/**
 * __useIndexReportQuery__
 *
 * To run a query within a React component, call `useIndexReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexReportQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexReportQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IndexReportQuery,
    IndexReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IndexReportQuery, IndexReportQueryVariables>(
    IndexReportDocument,
    options
  );
}
export function useIndexReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IndexReportQuery,
    IndexReportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IndexReportQuery, IndexReportQueryVariables>(
    IndexReportDocument,
    options
  );
}
export type IndexReportQueryHookResult = ReturnType<typeof useIndexReportQuery>;
export type IndexReportLazyQueryHookResult = ReturnType<
  typeof useIndexReportLazyQuery
>;
export type IndexReportQueryResult = Apollo.QueryResult<
  IndexReportQuery,
  IndexReportQueryVariables
>;
export const PackageByNamePackageInfoDocument = gql`
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

/**
 * __usePackageByNamePackageInfoQuery__
 *
 * To run a query within a React component, call `usePackageByNamePackageInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackageByNamePackageInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackageByNamePackageInfoQuery({
 *   variables: {
 *      packageName: // value for 'packageName'
 *   },
 * });
 */
export function usePackageByNamePackageInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    PackageByNamePackageInfoQuery,
    PackageByNamePackageInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PackageByNamePackageInfoQuery,
    PackageByNamePackageInfoQueryVariables
  >(PackageByNamePackageInfoDocument, options);
}
export function usePackageByNamePackageInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PackageByNamePackageInfoQuery,
    PackageByNamePackageInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PackageByNamePackageInfoQuery,
    PackageByNamePackageInfoQueryVariables
  >(PackageByNamePackageInfoDocument, options);
}
export type PackageByNamePackageInfoQueryHookResult = ReturnType<
  typeof usePackageByNamePackageInfoQuery
>;
export type PackageByNamePackageInfoLazyQueryHookResult = ReturnType<
  typeof usePackageByNamePackageInfoLazyQuery
>;
export type PackageByNamePackageInfoQueryResult = Apollo.QueryResult<
  PackageByNamePackageInfoQuery,
  PackageByNamePackageInfoQueryVariables
>;
export const PackagesByNameAndVersionPackageDocument = gql`
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

/**
 * __usePackagesByNameAndVersionPackageQuery__
 *
 * To run a query within a React component, call `usePackagesByNameAndVersionPackageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackagesByNameAndVersionPackageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackagesByNameAndVersionPackageQuery({
 *   variables: {
 *      packageName: // value for 'packageName'
 *      packageVersion: // value for 'packageVersion'
 *   },
 * });
 */
export function usePackagesByNameAndVersionPackageQuery(
  baseOptions: Apollo.QueryHookOptions<
    PackagesByNameAndVersionPackageQuery,
    PackagesByNameAndVersionPackageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PackagesByNameAndVersionPackageQuery,
    PackagesByNameAndVersionPackageQueryVariables
  >(PackagesByNameAndVersionPackageDocument, options);
}
export function usePackagesByNameAndVersionPackageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PackagesByNameAndVersionPackageQuery,
    PackagesByNameAndVersionPackageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PackagesByNameAndVersionPackageQuery,
    PackagesByNameAndVersionPackageQueryVariables
  >(PackagesByNameAndVersionPackageDocument, options);
}
export type PackagesByNameAndVersionPackageQueryHookResult = ReturnType<
  typeof usePackagesByNameAndVersionPackageQuery
>;
export type PackagesByNameAndVersionPackageLazyQueryHookResult = ReturnType<
  typeof usePackagesByNameAndVersionPackageLazyQuery
>;
export type PackagesByNameAndVersionPackageQueryResult = Apollo.QueryResult<
  PackagesByNameAndVersionPackageQuery,
  PackagesByNameAndVersionPackageQueryVariables
>;
export const PackagesPackagesDocument = gql`
  query PackagesPackages {
    packages {
      id
      name
      version
      dependencyCount
    }
  }
`;

/**
 * __usePackagesPackagesQuery__
 *
 * To run a query within a React component, call `usePackagesPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackagesPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackagesPackagesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePackagesPackagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PackagesPackagesQuery,
    PackagesPackagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PackagesPackagesQuery, PackagesPackagesQueryVariables>(
    PackagesPackagesDocument,
    options
  );
}
export function usePackagesPackagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PackagesPackagesQuery,
    PackagesPackagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PackagesPackagesQuery,
    PackagesPackagesQueryVariables
  >(PackagesPackagesDocument, options);
}
export type PackagesPackagesQueryHookResult = ReturnType<
  typeof usePackagesPackagesQuery
>;
export type PackagesPackagesLazyQueryHookResult = ReturnType<
  typeof usePackagesPackagesLazyQuery
>;
export type PackagesPackagesQueryResult = Apollo.QueryResult<
  PackagesPackagesQuery,
  PackagesPackagesQueryVariables
>;
export const SuggestionsByIdSuggestionDocument = gql`
  query SuggestionsByIdSuggestion($suggestionId: String!) {
    suggestion(id: $suggestionId) {
      id
      message
      name
      pluginTarget
      actions {
        message
        targetPackage {
          name
        }
      }
    }
  }
`;

/**
 * __useSuggestionsByIdSuggestionQuery__
 *
 * To run a query within a React component, call `useSuggestionsByIdSuggestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionsByIdSuggestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionsByIdSuggestionQuery({
 *   variables: {
 *      suggestionId: // value for 'suggestionId'
 *   },
 * });
 */
export function useSuggestionsByIdSuggestionQuery(
  baseOptions: Apollo.QueryHookOptions<
    SuggestionsByIdSuggestionQuery,
    SuggestionsByIdSuggestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SuggestionsByIdSuggestionQuery,
    SuggestionsByIdSuggestionQueryVariables
  >(SuggestionsByIdSuggestionDocument, options);
}
export function useSuggestionsByIdSuggestionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SuggestionsByIdSuggestionQuery,
    SuggestionsByIdSuggestionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SuggestionsByIdSuggestionQuery,
    SuggestionsByIdSuggestionQueryVariables
  >(SuggestionsByIdSuggestionDocument, options);
}
export type SuggestionsByIdSuggestionQueryHookResult = ReturnType<
  typeof useSuggestionsByIdSuggestionQuery
>;
export type SuggestionsByIdSuggestionLazyQueryHookResult = ReturnType<
  typeof useSuggestionsByIdSuggestionLazyQuery
>;
export type SuggestionsByIdSuggestionQueryResult = Apollo.QueryResult<
  SuggestionsByIdSuggestionQuery,
  SuggestionsByIdSuggestionQueryVariables
>;
