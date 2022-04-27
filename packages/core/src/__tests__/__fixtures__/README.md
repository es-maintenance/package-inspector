# Fixtures

These fixtures were made using [`fixturify`](https://github.com/joliss/node-fixturify).

```js
const fs = require('fs');
const fixturify = require('fixturify');

const directory = fixturify.readSync('DIR_NAME');

fs.writeFileSync('fixture.json', JSON.stringify(directory));
```
