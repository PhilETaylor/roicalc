import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import gzip from 'rollup-plugin-gzip';

export default {
  input: 'src/roi-calculator-form.js',
  output: {
    file: 'dist/roi-calculator-form.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_getters: true,
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true
      },
      mangle: {
        properties: {
          regex: /^_/  // Only mangle properties that start with underscore
        }
      },
      format: {
        comments: false
      }
    }),
    gzip({
      fileName: '.gz'
    })
  ],
  preserveEntrySignatures: false
};
