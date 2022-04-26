import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type DependencyMap {
    name: String
    version: String
  }

  type Package {
    breadcrumb: String
    name: String
    version: String
    funding: String
    homepage: String
    pathOnDisk: String
    size: Int
    type: String
    dependencies: [Package]
  }

  type Dependency {
    breadcrumb: String!
    funding: String
    homepage: String
    location: String!
    version: String!
    name: String!
    size: Float!
  }

  type ActionMeta {
    breadcrumb: String!
    name: String!
    directory: String!
    version: String!
    size: Float
  }

  type VersionMeta {
    version: String!
  }

  type Action {
    message: String!
    meta: ActionMeta!
  }

  type Suggestion {
    id: String!
    name: String!
    message: String!
    actions: [Action!]!
  }

  type Report {
    latestPackages: [DependencyMap]
    package: Package
    dependencies: [Package]
    suggestions: [Suggestion]
    summary: String
  }

  type Query {
    report: Report!
  }
`;
