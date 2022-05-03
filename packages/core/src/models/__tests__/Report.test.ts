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
import fse from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import createDebug from 'debug';

import * as GetOutdatedModule from '../../package/get-outdated';
import { Report, serializeReport } from '../Report';

import NO_NODE_MODULES from '../../__tests__/__fixtures__/no-node-modules.json';
import MIN_NODE_MODULES from '../../__tests__/__fixtures__/min-node-modules.json';
import { generateReport } from '../../report';

describe('Report', () => {
  const logger = createDebug('pi-core:Report:Test');

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
    cleanupTmpDir();
  });

  describe('loadFromFile', () => {
    test('it should load a simple json report', async () => {
      // Write a dummy project structure
      fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

      // Do not have any outdated packages
      getOutdatedSpy = vi
        .spyOn(GetOutdatedModule, 'getOutdated')
        .mockImplementation(async () => ({}));

      // Generate a report based off of dummy project structure.
      const generatedReport = await generateReport(tmpLocation);

      // Write the report to disk
      const reportPath = path.join(tmpLocation, 'report.json');
      fse.writeFileSync(reportPath, JSON.stringify(generatedReport));

      // Create a new Report instance.
      const report = new Report();

      // Verify the structure of the initial Report instance.
      expect(report).toMatchSnapshot();

      // Serialize the report from a file.
      report.loadFromFile(reportPath);

      // Verify the populated Report instance
      expect(report).toMatchSnapshot();
    });

    test('it should load a json report with minimal node modules', async () => {
      // Write a dummy project structure
      fixturify.writeSync(tmpLocation, MIN_NODE_MODULES as DirJSON);

      // Do not have any outdated packages
      getOutdatedSpy = vi
        .spyOn(GetOutdatedModule, 'getOutdated')
        .mockImplementation(async () => ({}));

      // Generate a report based off of dummy project structure.
      const generatedReport = await generateReport(tmpLocation);

      // Write the report to disk
      const reportPath = path.join(tmpLocation, 'report.json');
      fse.writeFileSync(reportPath, JSON.stringify(generatedReport));

      // Create a new Report instance.
      const report = new Report();

      // Verify the structure of the initial Report instance.
      expect(report).toMatchSnapshot();

      // Serialize the report from a file.
      report.loadFromFile(reportPath);

      // Verify the populated Report instance
      expect(report).toMatchSnapshot();
    });
  });

  describe('serializeReport', () => {
    test('it should serialize a serialize a simple report', async () => {
      // Write a dummy project structure
      fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

      // Do not have any outdated packages
      getOutdatedSpy = vi
        .spyOn(GetOutdatedModule, 'getOutdated')
        .mockImplementation(async () => ({}));

      // Generate a report based off of dummy project structure.
      const generatedReport = await generateReport(tmpLocation);

      // Write the report to disk
      const reportPath = path.join(tmpLocation, 'report.json');
      fse.writeFileSync(reportPath, JSON.stringify(generatedReport));

      // Read report from disk
      const jsonReport = JSON.parse(fse.readFileSync(reportPath, 'utf-8'));

      // Create a serialized Report;
      const report = serializeReport(jsonReport);

      // Verify the simple serialized report.
      expect(report).toMatchSnapshot();
    });

    test('it should serialize a project with minimal node modules', async () => {
      // Write a dummy project structure
      fixturify.writeSync(tmpLocation, MIN_NODE_MODULES as DirJSON);

      // Do not have any outdated packages
      getOutdatedSpy = vi
        .spyOn(GetOutdatedModule, 'getOutdated')
        .mockImplementation(async () => ({}));

      // Generate a report based off of dummy project structure.
      const generatedReport = await generateReport(tmpLocation);

      // Write the report to disk
      const reportPath = path.join(tmpLocation, 'report.json');
      fse.writeFileSync(reportPath, JSON.stringify(generatedReport));

      // Read report from disk
      const jsonReport = JSON.parse(fse.readFileSync(reportPath, 'utf-8'));

      // Create a serialized Report;
      const report = serializeReport(jsonReport);

      // Verify the minimal serialized report.
      expect(report).toMatchSnapshot();
    });

    test('it should serialize "latestPackages"', async () => {
      // Write a dummy project structure
      fixturify.writeSync(tmpLocation, NO_NODE_MODULES as DirJSON);

      // Do not have any outdated packages
      getOutdatedSpy = vi
        .spyOn(GetOutdatedModule, 'getOutdated')
        .mockImplementation(async () => ({
          foo: {
            latest: '1.33.7',
          },
          bar: {
            latest: '7.33.1',
          },
        }));

      // Generate a report based off of dummy project structure.
      const generatedReport = await generateReport(tmpLocation);

      // Write the report to disk
      const reportPath = path.join(tmpLocation, 'report.json');
      fse.writeFileSync(reportPath, JSON.stringify(generatedReport));

      // Read report from disk
      const jsonReport = JSON.parse(fse.readFileSync(reportPath, 'utf-8'));

      // Create a serialized Report;
      const report = serializeReport(jsonReport);

      // Verify the simple serialized report.
      expect(report).toMatchSnapshot();
    });

    test('it should error out during serialization when incorrect "latestPackages" is found', () => {
      // The base `latestPackages` field is incorrect;
      expect(() =>
        serializeReport({
          latestPackages: '',
        })
      ).toThrowError(
        `"jsonReport.latestPackages" should be of type "object" but found "string"`
      );

      // `latestPackages['foo']` is of type number when it should be a semver string
      expect(() =>
        serializeReport({
          latestPackages: {
            foo: 123,
          },
        })
      ).toThrowError(
        `"jsonReport.latestPackages['foo']" should be of type "string" but found "number"`
      );
    });
  });
});
