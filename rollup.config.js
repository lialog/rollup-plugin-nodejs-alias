import cleaner from 'rollup-plugin-cleaner';

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
    })
  ]
};