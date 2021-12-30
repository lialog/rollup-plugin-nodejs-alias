import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';

/**
 * @typedef {Object} NodeAliasOption
 * @property {Record<string, string>} entries
 * @property {boolean=} sourceMap
 * @property {string[]=} include
 * @property {string[]=} exclude
 */

/**
 * @param {NodeAliasOption} options
 * @returns {Plugin}
 */
const nodeJsAlias = (options) => {
  const hasSourceMap = options.sourceMap || false;
  const entryMap = options.entries || {};
  const include = options.include || [];
  const exclude = options.exclude || [];
  const filter = createFilter(include, exclude);

  return {
    name: 'nodejs-alias',
    transform(code, id) {
      // filter
      if (!filter(id)) {
        return null;
      }

      // init AST
      let ast = null;
      try {
        ast = this.parse(code);
      } catch (error) {
        return {
          code,
          sourceMap: null,
        };
      }

      // replace
      const magicString = new MagicString(code);
      const importDeclarations = ast.body.filter((node) => node.type === 'ImportDeclaration');
      for (const node of importDeclarations) {
        for (const name in entryMap) {
          if (node.source.value !== name) {
            continue;
          }
          magicString.overwrite(node.source.start, node.source.end, `"${entryMap[name]}"`, {
            storeName: true,
          });
        }
      }

      // result
      return {
        code: magicString.toString(),
        sourceMap: hasSourceMap ? magicString.generateMap({ hires: true }) : null,
      };
    },
  };
};

export default nodeJsAlias;
