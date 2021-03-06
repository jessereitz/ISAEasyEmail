import resolve from 'rollup-plugin-node-resolve';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife',
    sourcemap: true,
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
