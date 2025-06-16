import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

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
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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