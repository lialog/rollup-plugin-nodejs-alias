import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  preserveModules: true,
  output: [
    {
      format: 'esm',
      dir: 'dist/esm',
      exports: 'named',
    },
    {
      format: 'cjs',
      dir: 'dist/cjs',
      exports: 'named',
    },
  ],
  plugins: [
    cleaner({
      targets: ['./dist'],
    }),
    commonjs({
      sourceMap: false,
      include: 'node_modules/**',
    }),
    resolve({
      extensions: ['.js'],
    }),
    typescript({}),
    copy({
      targets: [
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
  ],
};
