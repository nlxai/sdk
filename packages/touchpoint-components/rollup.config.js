import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/browser.ts',
  output: {
    file: 'dist/touchpoint-components.umd.js',
    format: 'umd',
    name: 'TouchpointComponents',
    globals: {
      '@nlxai/touchpoint-ui': 'nlxai.touchpointUi'
    }
  },
  external: ['@nlxai/touchpoint-ui'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    terser()
  ]
};