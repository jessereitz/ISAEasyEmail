import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

module.exports = {
  external: ['writefree'],
  input: 'src/index.js',
  output: {
    file: 'build/dev.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      writefree: 'WriteFree',
    },
  },
  plugins: [
    resolve({
      module: false,
      only: ['build/js/writefree.min.js'],
    }),
    eslint(),
  ],
};
