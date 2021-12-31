# rollup-plugin-nodejs-alias

for resolving Node.js polyfill 


Before
```js
import path from 'path';

console.log(process.browser);
```

After
```js
import path from 'path-browserify';
import process from 'process-es6';

console.log(process.browser);
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
        path: 'path-browserify',
        process: 'process-es6'
      }
    }),
    ...
  ]
});

```

### package.json

```js
{
   ...
   "devDependencies": {
      ...
      "path-browserify": "...",
      "process-es6": "...",
      ...
   }
}
```
