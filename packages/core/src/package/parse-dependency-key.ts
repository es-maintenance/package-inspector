// @babel/core@0.5.0
// core-js@0.5.0
export function parseDependencyKey(key: string): {
  name: string;
  version: string;
} {
  const parts = key.split('@');

  // we hit a case like (@babel/core@0.5.0)
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
