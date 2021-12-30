# rollup-plugin-nodejs-alias

for resolving Node.js polyfill 


Before
```js
import path from 'path';

console.log(process.env.TEST);
```

After
```js
import path from 'path-browserify';
import process from 'process/browser';

console.log(process.env.TEST);
```


## Install

```sh
npm install --save-dev rollup-plugin-nodejs-alias
```

## Options

| key       | type                   | default |
|-----------|------------------------|---------|
| entries   | Record<string, string> |         |
| include   | string[] \| string     |         |
| exclude   | string[] \| string     |         |
| sourceMap | boolean                |         |

## Example

### rollup.config.js

```js
import nodejsAlias from 'rollup-plugin-nodejs-alias';

rollup({
  entry: 'src/index.ts',
  ...
  plugins: [
    commonJs({ ... }),
    resolve({ ... }),
    typescript({ ... }),
    babel({ ... }),
    nodejsAlias({
      include: ['src/**/*'],
      exclude: ['node_modules/**/*'],
      entries: {
        path: 'path-browserify'
      }
    }),
    ...
  ]
});

```

