import { makeSchema, connectionPlugin } from 'nexus';
import { join } from 'path';

import * as types from './types';

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(__dirname, '..', 'dist', 'codegen', 'schema.graphql'),
    typegen: join(__dirname, 'codegen', 'nexus-typegen.ts'),
  },
  contextType: {
    module: join(__dirname, 'context.ts'),
    export: 'Context',
  },
  plugins: [
    connectionPlugin({
      includeNodesField: true,
      extendConnection: {
        totalCount: { type: 'Int' },
      },
    }),
  ],
});
