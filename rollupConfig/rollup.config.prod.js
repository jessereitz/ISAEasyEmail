import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'build/prodIndex.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    resolve({
      module: true,
      main: true,
    }),
    eslint(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
