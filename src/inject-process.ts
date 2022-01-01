import { attachScopes } from '@rollup/pluginutils';
import { walk } from 'estree-walker';
import { type Program } from 'estree';
import { isIdentifierNode } from './utils';

const injectProcess = (ast: Program): boolean => {
  let flag = false;
  let scope = attachScopes(ast, 'scope');
  walk(ast, {
    enter(node) {
      if (node?.scope) {
        scope = node?.scope;
      }
      if (flag) {
        this.skip();
        return;
      }
      if (!scope.contains('process') && isIdentifierNode(node) && node?.name === 'process') {
        flag = true;
      }
    },
    leave(node) {
      if (node.scope) {
        scope = scope.parent;
      }
    },
  });
  return flag;
};

export default injectProcess;
