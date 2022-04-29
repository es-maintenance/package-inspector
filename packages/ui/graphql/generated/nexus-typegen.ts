/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { Context } from './../context';

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {}

export interface NexusGenEnums {}

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
  Package: {
    // root type
    funding?: string | null; // String
    homepage?: string | null; // String
    id: string; // ID!
    name: string; // String!
    type?: string | null; // String
    version: string; // String!
  };
  PackageMetadata: {
    // root type
    pathsOnDisk?: Array<string | null> | null; // [String]
    size?: NexusGenRootTypes['SizeInfo'] | null; // SizeInfo
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
    id: string; // ID!
    message: string; // String!
    name: string; // String!
    pluginTarget: string; // String!
  };
  SuggestionAction: {
    // root type
    message: string; // String!
    targetPackage?: NexusGenRootTypes['Package'] | null; // Package
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars;

export interface NexusGenFieldTypes {
  MiniPackage: {
    // field return type
    name: string; // String!
    version: string; // String!
  };
  Package: {
    // field return type
    dependencies: Array<NexusGenRootTypes['Package'] | null>; // [Package]!
    funding: string | null; // String
    homepage: string | null; // String
    id: string; // ID!
    metadata: NexusGenRootTypes['PackageMetadata'] | null; // PackageMetadata
    name: string; // String!
    type: string | null; // String
    version: string; // String!
  };
  PackageMetadata: {
    // field return type
    pathsOnDisk: Array<string | null> | null; // [String]
    size: NexusGenRootTypes['SizeInfo'] | null; // SizeInfo
  };
  Query: {
    // field return type
    packages: Array<NexusGenRootTypes['Package'] | null>; // [Package]!
    report: NexusGenRootTypes['Report']; // Report!
    suggestion: NexusGenRootTypes['Suggestion'] | null; // Suggestion
  };
  Report: {
    // field return type
    dependencies: Array<NexusGenRootTypes['Package'] | null>; // [Package]!
    id: string; // ID!
    latestPackages: Array<NexusGenRootTypes['MiniPackage'] | null>; // [MiniPackage]!
    root: NexusGenRootTypes['Package']; // Package!
    suggestions: Array<NexusGenRootTypes['Suggestion'] | null>; // [Suggestion]!
    summary: string; // String!
  };
  SizeInfo: {
    // field return type
    files: number | null; // Int
    physical: number | null; // Int
  };
  Suggestion: {
    // field return type
    actions: Array<NexusGenRootTypes['SuggestionAction'] | null>; // [SuggestionAction]!
    id: string; // ID!
    message: string; // String!
    name: string; // String!
    pluginTarget: string; // String!
  };
  SuggestionAction: {
    // field return type
    message: string; // String!
    targetPackage: NexusGenRootTypes['Package'] | null; // Package
  };
}

export interface NexusGenFieldTypeNames {
  MiniPackage: {
    // field return type name
    name: 'String';
    version: 'String';
  };
  Package: {
    // field return type name
    dependencies: 'Package';
    funding: 'String';
    homepage: 'String';
    id: 'ID';
    metadata: 'PackageMetadata';
    name: 'String';
    type: 'String';
    version: 'String';
  };
  PackageMetadata: {
    // field return type name
    pathsOnDisk: 'String';
    size: 'SizeInfo';
  };
  Query: {
    // field return type name
    packages: 'Package';
    report: 'Report';
    suggestion: 'Suggestion';
  };
  Report: {
    // field return type name
    dependencies: 'Package';
    id: 'ID';
    latestPackages: 'MiniPackage';
    root: 'Package';
    suggestions: 'Suggestion';
    summary: 'String';
  };
  SizeInfo: {
    // field return type name
    files: 'Int';
    physical: 'Int';
  };
  Suggestion: {
    // field return type name
    actions: 'SuggestionAction';
    id: 'ID';
    message: 'String';
    name: 'String';
    pluginTarget: 'String';
  };
  SuggestionAction: {
    // field return type name
    message: 'String';
    targetPackage: 'Package';
  };
}

export interface NexusGenArgTypes {
  Query: {
    suggestion: {
      // args
      id: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

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
