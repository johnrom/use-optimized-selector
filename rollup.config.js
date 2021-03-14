import path from 'path';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isExternal = (id) => !id.startsWith('.') && !path.isAbsolute(id);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    external: isExternal,
    plugins: [
      resolve({
        extensions, //specifies the extensions of files that the plugin will operate on
      }),
      babel({
        include: 'src/**',
        extensions,
        babelHelpers: 'bundled',
      }),
      typescript(),
      terser(),
    ],
  },
];
