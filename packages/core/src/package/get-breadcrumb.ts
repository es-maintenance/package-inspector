import { IArboristNode } from '../types';

export function getBreadcrumb(node: IArboristNode): string {
  const bread: string[] = [];

  function walk(node: IArboristNode): string[] {
    if (bread.includes(node.name)) {
      return bread;
    }

    if (node.edgesIn) {
      const [edge] = [...node.edgesIn.values()];

      if (edge && edge.from) {
        bread.push(edge.name);

        return walk(edge.from);
      } else {
        // we have gotten to the root project, don't push the root project name
        return bread;
      }
    } else {
      return bread;
    }
  }

  return walk(node).reverse().join('#');
}
