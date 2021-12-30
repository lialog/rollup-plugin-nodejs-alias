import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
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
  ],
};
