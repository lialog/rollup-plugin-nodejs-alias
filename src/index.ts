import MagicString from 'magic-string';
import { createFilter } from '@rollup/pluginutils';
import { type Plugin, type AcornNode } from 'rollup';
import { type Program, type ImportDeclaration } from 'estree';
import injectProcess from './inject-process';
import { type NodeAliasOption } from './types';
import { isImportDeclarationNode } from './utils';

const nodeJsAlias = (options: NodeAliasOption): Plugin => {
  const entryMap = options.entries ?? {};
  const hasSourceMap = options?.sourceMap ?? false;
  const include = options?.include ?? [];
  const exclude = options?.exclude ?? [];
  const filter = createFilter(include, exclude);

  return {
    name: 'nodejs-alias',
    transform(code: string, id: string) {
      // filter
      if (!filter(id)) {
        return null;
      }

      // init AST
      let ast: Program | null = null;
      try {
        ast = this.parse(code) as unknown as Program;
      } catch (error) {
        return {
          code,
          sourceMap: null,
        };
      }

      // replace
      const magicString = new MagicString(code);
      const importDeclarations = ast.body.filter((node): node is ImportDeclaration => isImportDeclarationNode(node));
      for (const node of importDeclarations) {
        for (const name in entryMap) {
          if (node.source.value !== name) {
            continue;
          }
          const source = node.source as unknown as AcornNode;
          magicString.overwrite(source.start, source.end, `"${entryMap[name]}"`, {
            storeName: true,
          });
        }
      }

      // inject process
      const isProcessImported =
        importDeclarations.findIndex((node) => node.source.value === 'process') > -1;
      if ('process' in entryMap && !isProcessImported) {
        const injectable = injectProcess(ast);
        if (injectable) {
          magicString.prepend(`import process from "${entryMap.process}";\n`);
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
