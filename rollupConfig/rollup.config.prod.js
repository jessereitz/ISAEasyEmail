import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

module.exports = {
  external: ['writefree'],
  input: 'src/index.js',
  output: {
    globals: {
      writefree: 'WriteFree',
    },
    file: 'assets/index.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
