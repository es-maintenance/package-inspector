import path from 'path';
import { getDirectorySize, stripPathOnDisk } from '../package';

export interface ISizeInfo {
  files: number;
  physical: number;
}

export interface IPackageMetadata {
  size?: ISizeInfo;
  pathsOnDisk: string[];
}

export interface IPackage {
  name: string;
  version: string;
  metadata?: IPackageMetadata;
  funding?: string;
  homepage?: string;
  dependencies: string[];
  type?: string;
}

export interface PackageOptions {
  name: string;
  path: string;
  rootPath: string;
  version: string;
  funding?: string;
  homepage?: string;
  type?: string;
}

export class Package {
  /**
   * A list of package keys that this package depends on.
   */
  dependencies: string[] = [];

  metadata: IPackageMetadata;
  name: string;
  path: string;
  version: string;
  rootPath: string;

  funding?: string;
  homepage?: string;
  type?: string;

  constructor(options: PackageOptions) {
    // Required fields
    this.name = options.name;
    this.path = options.path; // TODO: why do we have a path ont he package and in the metadata?
    this.version = options.version;
    this.rootPath = options.rootPath;

    // Optional fields
    this.funding = options.funding;
    this.homepage = options.homepage;
    this.type = options.type;

    // TODO: maybe make this lazy?
    this.metadata = {
      size: getDirectorySize({
        directory: this.path,
        exclude: new RegExp(path.resolve(this.path, 'node_modules')),
      }),
      pathsOnDisk: [stripPathOnDisk(this.path, this.rootPath)],
    };
  }

  addDependency(dependency: string) {
    this.dependencies.push(dependency);
  }

  addPath(pathOnDisk: string) {
    const strippedPath = stripPathOnDisk(pathOnDisk, this.rootPath);

    if (!this.metadata.pathsOnDisk.includes(strippedPath)) {
      this.metadata.pathsOnDisk.push(strippedPath);
    }
  }
}
