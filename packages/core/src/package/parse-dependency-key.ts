// @babel/core@0.5.0
// core-js@0.5.0
export function parseDependencyKey(key: string): {
  name: string;
  version?: string;
} {
  const parts = key.split('@');

  // We found an `@` symbol at the beginning of the key, so we have a scoped package name without a version.
  if (parts.length === 2 && parts[0] === '') {
    return {
      name: key,
    };
  }

  // We hit a case like `@babel/core@0.5.0`
  if (parts.length === 3) {
    return {
      name: `${parts[0]}@${parts[1]}`,
      version: parts[2],
    };
  }

  return {
    name: `${parts[0]}`,
    version: parts[1],
  };
}
