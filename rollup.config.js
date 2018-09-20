import resolve from 'rollup-plugin-node-resolve';

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
  ],
};
