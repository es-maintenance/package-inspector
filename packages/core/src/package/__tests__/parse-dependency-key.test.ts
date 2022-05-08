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
import { parseDependencyKey } from '../parse-dependency-key';

describe('parse-dependency-key', () => {
  test('it should handle a simple package name', () => {
    const packageName = 'left-page';

    expect(parseDependencyKey(packageName)).toEqual({ name: packageName });
  });

  test('it should handle a simple package name with a version', () => {
    const packageName = 'left-pad';
    const packageVersion = '1.0.0';
    const packageKey = `${packageName}@${packageVersion}`;

    expect(parseDependencyKey(packageKey)).toEqual({
      name: packageName,
      version: packageVersion,
    });
  });

  test('it should handle a scoped package name', () => {
    const packageName = '@algolia/autocomplete-core';

    expect(parseDependencyKey(packageName)).toEqual({
      name: packageName,
    });
  });

  test('it should handle a scoped package name with a version', () => {
    const packageName = '@algolia/autocomplete-core';
    const packageVersion = '1.5.2';
    const packageKey = `${packageName}@${packageVersion}`;

    expect(parseDependencyKey(packageKey)).toEqual({
      name: packageName,
      version: packageVersion,
    });
  });
});
