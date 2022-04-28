import {
  afterEach,
  beforeAll,
  describe,
  expect,
  SpyInstance,
  test,
  vi,
} from 'vitest';
import fixturify, { type DirJSON } from 'fixturify';
import tmp from 'tmp';

import NO_NODE_MODULES from '../../__tests__/__fixtures__/no-node-modules.json';
import MIN_NODE_MODULES from '../../__tests__/__fixtures__/min-node-modules.json';
import { generateReport } from '../generate-report';
import * as GetOutdatedModule from '../../package/get-outdated';

describe('generate-report', () => {
  let getOutdatedSpy: SpyInstance;

  beforeAll(() => {
    tmp.setGracefulCleanup();
  });

  afterEach(() => {
    getOutdatedSpy.mockRestore();
  });

  test('it generates a report for a package with no node_modules', async () => {
    const { name: tmpLocation } = tmp.dirSync();

    fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

    getOutdatedSpy = vi
      .spyOn(GetOutdatedModule, 'getOutdated')
      .mockImplementation(async () => ({}));

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  }, 10000);

  test('it generates a report for a package with basic node_modules', async () => {
    const { name: tmpLocation } = tmp.dirSync();

    fixturify.writeSync(tmpLocation, MIN_NODE_MODULES as DirJSON);

    getOutdatedSpy = vi
      .spyOn(GetOutdatedModule, 'getOutdated')
      .mockImplementation(async () => ({}));

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  }, 10000);

  test('it should add latest package info if outdated packages are found', async () => {
    const { name: tmpLocation } = tmp.dirSync();

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
