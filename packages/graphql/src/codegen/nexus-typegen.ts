/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './../context';
import type { core, connectionPluginCore } from 'nexus';

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<
        TypeName,
        FieldName
      > & {
        totalCount: connectionPluginCore.ConnectionFieldResolver<
          TypeName,
          FieldName,
          'totalCount'
        >;
      }
    ): void;
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {
  priority: 'HIGH' | 'LOW' | 'MEDIUM';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenObjects {
  MiniPackage: {
    // root type
    name: string; // String!
    version: string; // String!
  };
  MiniPackageConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['MiniPackageEdge'] | null> | null; // [MiniPackageEdge]
    nodes?: Array<NexusGenRootTypes['MiniPackage'] | null> | null; // [MiniPackage]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount?: number | null; // Int
  };
  MiniPackageEdge: {
    // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['MiniPackage'] | null; // MiniPackage
  };
  Package: {
    // root type
    funding?: string | null; // String
    homepage?: string | null; // String
    id: string; // ID!
    name: string; // String!
    type?: string | null; // String
    version: string; // String!
  };
  PackageCompound: {
    // root type
    name: string; // String!
  };
  PackageConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['PackageEdge'] | null> | null; // [PackageEdge]
    nodes?: Array<NexusGenRootTypes['Package'] | null> | null; // [Package]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount?: number | null; // Int
  };
  PackageEdge: {
    // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Package'] | null; // Package
  };
  PackageMetadata: {
    // root type
    pathsOnDisk?: Array<string | null> | null; // [String]
    size?: NexusGenRootTypes['SizeInfo'] | null; // SizeInfo
  };
  PageInfo: {
    // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  };
  Query: {};
  Report: {
    // root type
    id: string; // ID!
    root: NexusGenRootTypes['Package']; // Package!
  };
  SizeInfo: {
    // root type
    files?: number | null; // Int
    physical?: number | null; // Int
  };
  Suggestion: {
    // root type
    actions: Array<NexusGenRootTypes['SuggestionAction'] | null>; // [SuggestionAction]!
    id: string; // ID!
    message: string; // String!
    name: string; // String!
    pluginTarget: string; // String!
  };
  SuggestionAction: {
    // root type
    message: string; // String!
    priority?: NexusGenEnums['priority'] | null; // priority
    targetPackageId: string; // String!
  };
  SuggestionConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['SuggestionEdge'] | null> | null; // [SuggestionEdge]
    nodes?: Array<NexusGenRootTypes['Suggestion'] | null> | null; // [Suggestion]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount?: number | null; // Int
  };
  SuggestionEdge: {
    // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Suggestion'] | null; // Suggestion
  };
  TopSuggestions: {
    // root type
    count: number; // Int!
    package: NexusGenRootTypes['Package']; // Package!
  };
  TopSuggestionsConnection: {
    // root type
    edges?: Array<NexusGenRootTypes['TopSuggestionsEdge'] | null> | null; // [TopSuggestionsEdge]
    nodes?: Array<NexusGenRootTypes['TopSuggestions'] | null> | null; // [TopSuggestions]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount?: number | null; // Int
  };
  TopSuggestionsEdge: {
    // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['TopSuggestions'] | null; // TopSuggestions
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  MiniPackage: {
    // field return type
    name: string; // String!
    version: string; // String!
  };
  MiniPackageConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['MiniPackageEdge'] | null> | null; // [MiniPackageEdge]
    nodes: Array<NexusGenRootTypes['MiniPackage'] | null> | null; // [MiniPackage]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  };
  MiniPackageEdge: {
    // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['MiniPackage'] | null; // MiniPackage
  };
  Package: {
    // field return type
    dependencies: NexusGenRootTypes['PackageConnection']; // PackageConnection!
    dependencyCount: number; // Int!
    funding: string | null; // String
    homepage: string | null; // String
    id: string; // ID!
    metadata: NexusGenRootTypes['PackageMetadata'] | null; // PackageMetadata
    name: string; // String!
    parent: NexusGenRootTypes['PackageConnection']; // PackageConnection!
    suggestions: NexusGenRootTypes['SuggestionConnection']; // SuggestionConnection!
    type: string | null; // String
    version: string; // String!
  };
  PackageCompound: {
    // field return type
    latest: string; // String!
    name: string; // String!
    variants: NexusGenRootTypes['PackageConnection']; // PackageConnection!
  };
  PackageConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['PackageEdge'] | null> | null; // [PackageEdge]
    nodes: Array<NexusGenRootTypes['Package'] | null> | null; // [Package]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  };
  PackageEdge: {
    // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Package'] | null; // Package
  };
  PackageMetadata: {
    // field return type
    pathsOnDisk: Array<string | null> | null; // [String]
    size: NexusGenRootTypes['SizeInfo'] | null; // SizeInfo
  };
  PageInfo: {
    // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  };
  Query: {
    // field return type
    package: NexusGenRootTypes['PackageCompound'] | null; // PackageCompound
    packageByVersion: NexusGenRootTypes['Package'] | null; // Package
    packages: NexusGenRootTypes['PackageConnection']; // PackageConnection!
    packagesBySearchKey: NexusGenRootTypes['PackageConnection']; // PackageConnection!
    report: NexusGenRootTypes['Report']; // Report!
    suggestion: NexusGenRootTypes['Suggestion'] | null; // Suggestion
    title: string; // String!
  };
  Report: {
    // field return type
    dependencies: NexusGenRootTypes['PackageConnection']; // PackageConnection!
    id: string; // ID!
    latestPackages: NexusGenRootTypes['MiniPackageConnection']; // MiniPackageConnection!
    root: NexusGenRootTypes['Package']; // Package!
    suggestions: NexusGenRootTypes['SuggestionConnection']; // SuggestionConnection!
    summary: string; // String!
    topSuggestions: NexusGenRootTypes['TopSuggestionsConnection']; // TopSuggestionsConnection!
  };
  SizeInfo: {
    // field return type
    files: number | null; // Int
    physical: number | null; // Int
  };
  Suggestion: {
    // field return type
    actions: Array<NexusGenRootTypes['SuggestionAction'] | null>; // [SuggestionAction]!
    count: number; // Int!
    id: string; // ID!
    message: string; // String!
    name: string; // String!
    pluginTarget: string; // String!
  };
  SuggestionAction: {
    // field return type
    message: string; // String!
    priority: NexusGenEnums['priority'] | null; // priority
    targetPackage: NexusGenRootTypes['Package'] | null; // Package
    targetPackageId: string; // String!
  };
  SuggestionConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['SuggestionEdge'] | null> | null; // [SuggestionEdge]
    nodes: Array<NexusGenRootTypes['Suggestion'] | null> | null; // [Suggestion]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  };
  SuggestionEdge: {
    // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Suggestion'] | null; // Suggestion
  };
  TopSuggestions: {
    // field return type
    count: number; // Int!
    package: NexusGenRootTypes['Package']; // Package!
  };
  TopSuggestionsConnection: {
    // field return type
    edges: Array<NexusGenRootTypes['TopSuggestionsEdge'] | null> | null; // [TopSuggestionsEdge]
    nodes: Array<NexusGenRootTypes['TopSuggestions'] | null> | null; // [TopSuggestions]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number | null; // Int
  };
  TopSuggestionsEdge: {
    // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['TopSuggestions'] | null; // TopSuggestions
  };
}

export interface NexusGenFieldTypeNames {
  MiniPackage: {
    // field return type name
    name: 'String';
    version: 'String';
  };
  MiniPackageConnection: {
    // field return type name
    edges: 'MiniPackageEdge';
    nodes: 'MiniPackage';
    pageInfo: 'PageInfo';
    totalCount: 'Int';
  };
  MiniPackageEdge: {
    // field return type name
    cursor: 'String';
    node: 'MiniPackage';
  };
  Package: {
    // field return type name
    dependencies: 'PackageConnection';
    dependencyCount: 'Int';
    funding: 'String';
    homepage: 'String';
    id: 'ID';
    metadata: 'PackageMetadata';
    name: 'String';
    parent: 'PackageConnection';
    suggestions: 'SuggestionConnection';
    type: 'String';
    version: 'String';
  };
  PackageCompound: {
    // field return type name
    latest: 'String';
    name: 'String';
    variants: 'PackageConnection';
  };
  PackageConnection: {
    // field return type name
    edges: 'PackageEdge';
    nodes: 'Package';
    pageInfo: 'PageInfo';
    totalCount: 'Int';
  };
  PackageEdge: {
    // field return type name
    cursor: 'String';
    node: 'Package';
  };
  PackageMetadata: {
    // field return type name
    pathsOnDisk: 'String';
    size: 'SizeInfo';
  };
  PageInfo: {
    // field return type name
    endCursor: 'String';
    hasNextPage: 'Boolean';
    hasPreviousPage: 'Boolean';
    startCursor: 'String';
  };
  Query: {
    // field return type name
    package: 'PackageCompound';
    packageByVersion: 'Package';
    packages: 'PackageConnection';
    packagesBySearchKey: 'PackageConnection';
    report: 'Report';
    suggestion: 'Suggestion';
    title: 'String';
  };
  Report: {
    // field return type name
    dependencies: 'PackageConnection';
    id: 'ID';
    latestPackages: 'MiniPackageConnection';
    root: 'Package';
    suggestions: 'SuggestionConnection';
    summary: 'String';
    topSuggestions: 'TopSuggestionsConnection';
  };
  SizeInfo: {
    // field return type name
    files: 'Int';
    physical: 'Int';
  };
  Suggestion: {
    // field return type name
    actions: 'SuggestionAction';
    count: 'Int';
    id: 'ID';
    message: 'String';
    name: 'String';
    pluginTarget: 'String';
  };
  SuggestionAction: {
    // field return type name
    message: 'String';
    priority: 'priority';
    targetPackage: 'Package';
    targetPackageId: 'String';
  };
  SuggestionConnection: {
    // field return type name
    edges: 'SuggestionEdge';
    nodes: 'Suggestion';
    pageInfo: 'PageInfo';
    totalCount: 'Int';
  };
  SuggestionEdge: {
    // field return type name
    cursor: 'String';
    node: 'Suggestion';
  };
  TopSuggestions: {
    // field return type name
    count: 'Int';
    package: 'Package';
  };
  TopSuggestionsConnection: {
    // field return type name
    edges: 'TopSuggestionsEdge';
    nodes: 'TopSuggestions';
    pageInfo: 'PageInfo';
    totalCount: 'Int';
  };
  TopSuggestionsEdge: {
    // field return type name
    cursor: 'String';
    node: 'TopSuggestions';
  };
}

export interface NexusGenArgTypes {
  Package: {
    dependencies: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    parent: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    suggestions: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
  };
  PackageCompound: {
    variants: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
  };
  Query: {
    package: {
      // args
      packageName: string; // String!
    };
    packageByVersion: {
      // args
      packageName: string; // String!
      packageVersion: string; // String!
    };
    packages: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    packagesBySearchKey: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      packageName: string; // String!
    };
    suggestion: {
      // args
      id: string; // String!
    };
  };
  Report: {
    dependencies: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    latestPackages: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    suggestions: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
    topSuggestions: {
      // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
