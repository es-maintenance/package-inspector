import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type DependencyMap {
    name: String
    version: String
  }

  interface Package {
    name: String
    version: String
    dependencies: [Package]
    devDependencies: [Package]
  }

  type ArboristEdge {
    name: String!
    spec: String!
    accept: String!
    from: ArboristNode!
    to: ArboristNode!
  }

  type ArboristNode {
    dev: Boolean!
    devOptional: Boolean!
    dummy: Boolean!
    extraneous: Boolean!
    hasShrinkwrap: Boolean!
    legacyPeerDeps: Boolean!
    location: String!
    name: String!
    optional: Boolean!
    path: String!
    peer: String!
    realpath: String!
    package: Package!
    packageName: String!
    isLink: Boolean!
    isWorkspace: Boolean!
    homepage: String!
    funding: String!
    version: String!
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

  type Suggestionnput {
    rootArboristNode: ArboristNode
    arboristValues: [ArboristNode!]!
    latestPackages: [DependencyMap]
  }

  type Suggestion {
    id: String!
    name: String!
    message: String!
    actions: [Action!]!
  }

  type Report {
    latestPackages: [DependencyMap]!
    package: Package!
    dependencies: [Package]
    suggestions: [Suggestion!]!
  }

  type Query {
    report: Report!
  }
`;
