import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: 'json' };

const externalDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
    external: externalDeps,
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      json(),
      postcss(),
      typescript({ tsconfig: './tsconfig.json', declaration: true, declarationDir: 'lib', rootDir: 'src' }),
    ],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'lib/index.umd.js',
      format: 'umd',
      name: 'TouchpointUI',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    external: ['react', 'react-dom'],
    plugins: [
      nodeResolve(),
      commonjs(),
      json(),
      postcss(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
  },
];
