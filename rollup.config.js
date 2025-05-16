import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/roi-calculator-form.js',
  output: {
    file: 'dist/roi-calculator-form.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    terser() // Minify the bundle
  ],
  preserveEntrySignatures: false
};
