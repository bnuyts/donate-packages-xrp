import typescript from '@rollup/plugin-typescript';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [preserveShebangs(), typescript(), terser()],
  external: ['yargs', 'ripple-lib'],
};
