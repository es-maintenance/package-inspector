const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

module.exports = buildSchema(
  readFileSync(
    require.resolve(`@package-inspector/graphql/dist/codegen/schema.graphql`),
    { encoding: 'utf-8' }
  )
);
