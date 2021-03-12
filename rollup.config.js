import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.ts'];

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions, //specifies the extensions of files that the plugin will operate on
      }),
      babel({
        exclude: 'node_modules/**',
        extensions,
      }),
    ],
  },
];
