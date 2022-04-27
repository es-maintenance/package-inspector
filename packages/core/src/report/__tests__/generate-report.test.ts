import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import fixturify, { type DirJSON } from 'fixturify';
import tmp from 'tmp';

import MIN_NODE_MODULES from '../../__tests__/__fixtures__/min-node-modules.json';
import { generateReport } from '../generate-report';

describe('generate-report', () => {
  // TODO: figure out mocking network calls to NPM to get latest package info.

  beforeAll(() => {
    tmp.setGracefulCleanup();
  });

  test('it generates a report for a package with basic node_modules', async () => {
    const { name: tmpLocation } = tmp.dirSync();

    fixturify.writeSync(tmpLocation, MIN_NODE_MODULES as DirJSON);

    const r = await generateReport(tmpLocation);

    expect(r).toMatchSnapshot();
  }, 10000);
});
