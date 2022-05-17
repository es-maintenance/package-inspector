import { makeSchema } from 'nexus';
import { join } from 'path';

import * as types from '../graphql/types';

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, '..', 'dist', 'schema.graphql'),
    typegen: join(__dirname, '..', 'dist', 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
});
