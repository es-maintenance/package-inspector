import { makeSchema } from 'nexus';
import { join } from 'path';

import * as types from './types';

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), 'graphql', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'graphql', 'generated', 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), 'graphql', 'context.ts'),
    export: 'Context',
  },
});

// export const typeDefs = gql`
//   type DependencyMap {
//     name: String
//     version: String
//   }

//   type SizeInfo {
//     files: Int
//     physical: Int
//   }

//   type PackageMetadata {
//     size: SizeInfo
//     pathsOnDisk: [String]
//   }

//   type Package {
//     funding: String
//     homepage: String
//     name: String!
//     version: String!
//     metadata: PackageMetadata
//     dependencies: [String]
//     type: String
//   }

// type Report {
//   latestPackages: [DependencyMap]
//   root: Package
//   dependencies: [Package]!
//   suggestions: [Suggestion]
//   summary: String
// }
//   type SuggestionAction {
//     message: String!
//     targetPackage: String!
//   }

//   type Suggestion {
//     id: String!
//     name: String!
//     message: String!
//     actions: [SuggestionAction!]!
//   }

//   type Report {
//     latestPackages: [DependencyMap]
//     root: Package
//     dependencies: [Package]
//     suggestions: [Suggestion]
//     summary: String
//   }

//   type Query {
//     report: Report!
//   }
// `;
