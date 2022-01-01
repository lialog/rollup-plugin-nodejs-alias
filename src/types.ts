import { type AttachedScope } from '@rollup/pluginutils';

export interface NodeAliasOption {
  entries: Record<string, string>;
  include?: string[];
  exclude?: string[];
  sourceMap?: boolean;
}

declare module 'estree' {
  /**
   * Override type
   */
  interface BaseNodeWithoutComments {
    scope?: AttachedScope;
  }
}
