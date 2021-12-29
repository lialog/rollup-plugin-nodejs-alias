import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';

export default {
	input: 'src/index.js',
	output: [
		{
			format: 'esm',
      dir: 'dist/esm',
      exports: 'named'
		},
		{
			format: 'cjs',
			dir: 'dist/cjs',
      exports: 'named'
		}
	],
  plugins: [
    cleaner({
      targets: ['./dist']
    }),
    copy({
      targets: [{ src: 'package.json', dest: 'dist' }]
    })
  ]
};