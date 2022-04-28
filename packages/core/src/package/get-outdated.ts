import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export interface OutdatedData {
  [key: string]: {
    latest: string;
  };
}

export async function getOutdated(dir: string): Promise<OutdatedData> {
  let packageData: OutdatedData = {};

  try {
    await execPromise('npm outdated --json', {
      cwd: dir,
    });
  } catch (ex: any) {
    packageData = JSON.parse(ex.stdout.toString('utf8')) as OutdatedData;
  }

  return packageData;
}
