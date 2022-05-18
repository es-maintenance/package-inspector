import type { Package } from '@package-inspector/core';

export function getPackageID(pkg: Package): string {
  return `${pkg.name}@${pkg.version}`;
}
