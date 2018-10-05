import { eslint } from 'rollup-plugin-eslint';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    eslint(),
  ],
};
