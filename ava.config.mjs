export default {
  typescript: {
    extensions: ['ts'],
    rewritePaths: {},
    compile: false,
  },
  files: ['test/*.ts'],
  require: ['ts-node/register'],
};
