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

export type MiniPackageConnection = {
  __typename?: 'MiniPackageConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<MiniPackageEdge>>>;
  /** Flattened list of MiniPackage type */
  nodes?: Maybe<Array<Maybe<MiniPackage>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MiniPackageEdge = {
  __typename?: 'MiniPackageEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<MiniPackage>;
};

export type Package = {
  __typename?: 'Package';
  dependencies: PackageConnection;
  dependencyCount: Scalars['Int'];
  funding?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<PackageMetadata>;
  name: Scalars['String'];
  parent: PackageConnection;
  suggestions: SuggestionConnection;
  type?: Maybe<Scalars['String']>;
  version: Scalars['String'];
};

export type PackagedependenciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PackageparentArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PackagesuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PackageCompound = {
  __typename?: 'PackageCompound';
  latest: Scalars['String'];
  name: Scalars['String'];
  variants: PackageConnection;
};

export type PackageCompoundvariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PackageConnection = {
  __typename?: 'PackageConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<PackageEdge>>>;
  /** Flattened list of Package type */
  nodes?: Maybe<Array<Maybe<Package>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PackageEdge = {
  __typename?: 'PackageEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Package>;
};

export type PackageMetadata = {
  __typename?: 'PackageMetadata';
  pathsOnDisk?: Maybe<Array<Maybe<Scalars['String']>>>;
  size?: Maybe<SizeInfo>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  package?: Maybe<PackageCompound>;
  packageByVersion?: Maybe<Package>;
  packages: PackageConnection;
  packagesBySearchKey: PackageConnection;
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

export type QuerypackagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QuerypackagesBySearchKeyArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  packageName: Scalars['String'];
};

export type QuerysuggestionArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  dependencies: PackageConnection;
  id: Scalars['ID'];
  latestPackages: MiniPackageConnection;
  root: Package;
  suggestions: SuggestionConnection;
  summary: Scalars['String'];
  topSuggestions: TopSuggestionsConnection;
};

export type ReportdependenciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ReportlatestPackagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ReportsuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ReporttopSuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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
  targetPackage?: Maybe<Package>;
  targetPackageId: Scalars['String'];
};

export type SuggestionConnection = {
  __typename?: 'SuggestionConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<SuggestionEdge>>>;
  /** Flattened list of Suggestion type */
  nodes?: Maybe<Array<Maybe<Suggestion>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type SuggestionEdge = {
  __typename?: 'SuggestionEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Suggestion>;
};

export type TopSuggestions = {
  __typename?: 'TopSuggestions';
  count: Scalars['Int'];
  package: Package;
};

export type TopSuggestionsConnection = {
  __typename?: 'TopSuggestionsConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<TopSuggestionsEdge>>>;
  /** Flattened list of TopSuggestions type */
  nodes?: Maybe<Array<Maybe<TopSuggestions>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TopSuggestionsEdge = {
  __typename?: 'TopSuggestionsEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<TopSuggestions>;
};

export type NavbarTitleQueryVariables = Exact<{ [key: string]: never }>;

export type NavbarTitleQuery = { __typename?: 'Query'; title: string };

export type PackagesSearchedByKeyFragment = {
  __typename?: 'Package';
  name: string;
  version: string;
  id: string;
};

export type PackagesBySearchKeyQueryVariables = Exact<{
  packageName: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
}>;

export type PackagesBySearchKeyQuery = {
  __typename?: 'Query';
  packagesBySearchKey: {
    __typename?: 'PackageConnection';
    totalCount?: number | null;
    nodes?: Array<{
      __typename?: 'Package';
      name: string;
      version: string;
      id: string;
    } | null> | null;
  };
};

export type DetailsReportQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;

export type DetailsReportQuery = {
  __typename?: 'Query';
  report: {
    __typename?: 'Report';
    summary: string;
    root: {
      __typename?: 'Package';
      name: string;
      version: string;
      dependencies: {
        __typename?: 'PackageConnection';
        totalCount?: number | null;
        nodes?: Array<{
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
        } | null> | null;
        pageInfo: {
          __typename?: 'PageInfo';
          endCursor?: string | null;
          hasPreviousPage: boolean;
          startCursor?: string | null;
          hasNextPage: boolean;
        };
      };
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
    root: { __typename?: 'Package'; name: string; version: string };
    topSuggestions: {
      __typename?: 'TopSuggestionsConnection';
      nodes?: Array<{
        __typename?: 'TopSuggestions';
        count: number;
        package: {
          __typename?: 'Package';
          id: string;
          version: string;
          name: string;
        };
      } | null> | null;
    };
    suggestions: {
      __typename?: 'SuggestionConnection';
      nodes?: Array<{
        __typename?: 'Suggestion';
        id: string;
        pluginTarget: string;
        name: string;
        message: string;
        count: number;
      } | null> | null;
    };
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
    variants: {
      __typename?: 'PackageConnection';
      nodes?: Array<{
        __typename?: 'Package';
        id: string;
        version: string;
        name: string;
        parent: {
          __typename?: 'PackageConnection';
          nodes?: Array<{
            __typename?: 'Package';
            id: string;
            name: string;
            version: string;
          } | null> | null;
        };
      } | null> | null;
    };
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
    suggestions: {
      __typename?: 'SuggestionConnection';
      nodes?: Array<{
        __typename?: 'Suggestion';
        id: string;
        message: string;
        actions: Array<{
          __typename?: 'SuggestionAction';
          message: string;
          targetPackage?: { __typename?: 'Package'; id: string } | null;
        } | null>;
      } | null> | null;
    };
  } | null;
};

export type PackagesPackagesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;

export type PackagesPackagesQuery = {
  __typename?: 'Query';
  packages: {
    __typename?: 'PackageConnection';
    totalCount?: number | null;
    nodes?: Array<{
      __typename?: 'Package';
      id: string;
      name: string;
      version: string;
      dependencyCount: number;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasPreviousPage: boolean;
      startCursor?: string | null;
      hasNextPage: boolean;
    };
  };
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

export const PackagesSearchedByKeyFragmentDoc = gql`
  fragment PackagesSearchedByKey on Package {
    name
    version
    id
  }
`;
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
export const PackagesBySearchKeyDocument = gql`
  query PackagesBySearchKey($packageName: String!, $first: Int) {
    packagesBySearchKey(packageName: $packageName, first: $first) {
      totalCount
      nodes {
        ...PackagesSearchedByKey
      }
    }
  }
  ${PackagesSearchedByKeyFragmentDoc}
`;

/**
 * __usePackagesBySearchKeyQuery__
 *
 * To run a query within a React component, call `usePackagesBySearchKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackagesBySearchKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackagesBySearchKeyQuery({
 *   variables: {
 *      packageName: // value for 'packageName'
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePackagesBySearchKeyQuery(
  baseOptions: Apollo.QueryHookOptions<
    PackagesBySearchKeyQuery,
    PackagesBySearchKeyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PackagesBySearchKeyQuery,
    PackagesBySearchKeyQueryVariables
  >(PackagesBySearchKeyDocument, options);
}
export function usePackagesBySearchKeyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PackagesBySearchKeyQuery,
    PackagesBySearchKeyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PackagesBySearchKeyQuery,
    PackagesBySearchKeyQueryVariables
  >(PackagesBySearchKeyDocument, options);
}
export type PackagesBySearchKeyQueryHookResult = ReturnType<
  typeof usePackagesBySearchKeyQuery
>;
export type PackagesBySearchKeyLazyQueryHookResult = ReturnType<
  typeof usePackagesBySearchKeyLazyQuery
>;
export type PackagesBySearchKeyQueryResult = Apollo.QueryResult<
  PackagesBySearchKeyQuery,
  PackagesBySearchKeyQueryVariables
>;
export const DetailsReportDocument = gql`
  query DetailsReport($first: Int, $after: String) {
    report {
      summary
      root {
        name
        version
        dependencies(first: $first, after: $after) {
          totalCount
          nodes {
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
          pageInfo {
            endCursor
            hasPreviousPage
            startCursor
            hasNextPage
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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
      }
      topSuggestions(first: 5) {
        nodes {
          ...IndexPageTopSuggestion
        }
      }
      suggestions(first: 10) {
        nodes {
          ...CardViewSuggestions
        }
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
      variants(first: 10) {
        nodes {
          id
          version
          name
          parent(first: 10) {
            nodes {
              id
              name
              version
            }
          }
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
  query PackagesPackages($first: Int, $after: String) {
    packages(first: $first, after: $after) {
      totalCount
      nodes {
        id
        name
        version
        dependencyCount
      }
      pageInfo {
        endCursor
        hasPreviousPage
        startCursor
        hasNextPage
      }
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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
