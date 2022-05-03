import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  SpyInstance,
  test,
  vi,
} from 'vitest';
import fixturify, { type DirJSON } from 'fixturify';
import tmp from 'tmp';
import path from 'path';
import createDebug from 'debug';
import fse from 'fs-extra';

import NO_NODE_MODULES from '../../__tests__/__fixtures__/no-node-modules.json';
import MIN_NODE_MODULES from '../../__tests__/__fixtures__/min-node-modules.json';
import { generateReport } from '../generate-report';
import * as GetOutdatedModule from '../../package/get-outdated';

describe('generate-report', () => {
  const logger = createDebug('pi-core:generate-report:test');

  let cleanupTmpDir = () => {};
  let getOutdatedSpy: SpyInstance;
  let tmpLocation: string;
  let __tmp_dir__: string;

  beforeAll(() => {
    tmp.setGracefulCleanup();

    __tmp_dir__ = path.join(__dirname, '__tmp__');

    fse.ensureDirSync(__tmp_dir__);

    logger(`Using tmpDir: ${__tmp_dir__}`);
  });

  beforeEach(() => {
    const tmpObject = tmp.dirSync({
      tmpdir: __tmp_dir__,
      unsafeCleanup: true,
    });

    tmpLocation = tmpObject.name;
    cleanupTmpDir = tmpObject.removeCallback;
  });

  afterEach(() => {
    getOutdatedSpy?.mockRestore();

    cleanupTmpDir();
  });

  test('it generates a report for a package with no node_modules', async () => {
    fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

    getOutdatedSpy = vi
      .spyOn(GetOutdatedModule, 'getOutdated')
      .mockImplementation(async () => ({}));

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  }, 10000);

  test('it generates a report for a package with basic node_modules', async () => {
    fixturify.writeSync(tmpLocation, MIN_NODE_MODULES as DirJSON);

    getOutdatedSpy = vi
      .spyOn(GetOutdatedModule, 'getOutdated')
      .mockImplementation(async () => ({}));

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  }, 10000);

  test('it should add latest package info if outdated packages are found', async () => {
    fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

    // Setting up `getOutdated` to return a value
    getOutdatedSpy = vi
      .spyOn(GetOutdatedModule, 'getOutdated')
      .mockImplementation(async () => {
        return {
          foo: {
            latest: '0.2.1',
          },
        };
      });

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  });
});
