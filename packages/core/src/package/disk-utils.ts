import debug from 'debug';
import fs from 'fs';
import path from 'path';

const logger = debug('pi-core:disk-utils');

export function getAllFiles(
  dirPath: string,
  exclude?: RegExp,
  arrayOfFiles?: string[]
) {
  const files = fs.readdirSync(dirPath);

  const _arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file: string) {
    const fullPath = path.join(dirPath, file);

    try {
      if (
        fs.statSync(fullPath).isDirectory() &&
        (!exclude || (exclude && !exclude.test(fullPath)))
      ) {
        try {
          _arrayOfFiles.push(...getAllFiles(fullPath, exclude));
        } catch (ex: any) {
          logger(ex.message);
        }
      } else {
        if (!exclude || (exclude && !exclude.test(fullPath))) {
          _arrayOfFiles.push(fullPath);
        } else {
          logger('excluding', fullPath, ' for ', dirPath, exclude);
        }
      }
    } catch (ex: any) {
      logger(ex.message);
    }
  });

  return _arrayOfFiles;
}

export function getDirectorySize({
  directory,
  exclude,
}: {
  directory: string;
  exclude?: RegExp;
}): { files: number; physical: number } {
  const arrayOfFiles = getAllFiles(directory, exclude);

  const size = arrayOfFiles
    .map((filePath) => fs.statSync(filePath).size)
    .reduce((a, b) => a + b, 0);

  return {
    files: arrayOfFiles.length,
    physical: size,
  };
}

export function stripPathOnDisk(nodePath: string, workingPath: string): string {
  if (process.env.NODE_ENV === 'test') {
    // macOS uses a sym-link for `/tmp -> /private/tmp` dir and `nodePath` will start `/private`
    const slugToStrip = nodePath.startsWith('/private')
      ? `/private${workingPath}`
      : workingPath;

    return nodePath.replace(slugToStrip, '');
  }

  return nodePath;
}
