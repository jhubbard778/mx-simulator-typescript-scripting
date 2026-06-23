import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolveRollup from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const production = process.env.NODE_ENV === 'production';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	input: 'src/entry.ts',
	output: {
		file: 'dist/frills.js', // Change to desired output
		format: 'es',
    strict: false
	},
	plugins: [
        alias({
          entries: [
            { find: '@', replacement: resolve(__dirname, './src') }
          ]
        }),
        resolveRollup({ extensions: ['.ts', '.js'] }),
        commonjs(),     // converts require() to ES modules so Rollup can inline them
        babel({
            babelHelpers: 'bundled',  // Inline helpers, no external dep needed
            extensions: ['.ts', '.js'],
            presets: [
              ['@babel/preset-env', {
                targets: { browsers: ['ie 11'] }, // IE11 ≈ ES5, good Duktape proxy
                modules: false,                   // Let Rollup handle modules
              }],
              ['@babel/preset-typescript'],
            ]
        }),
        production && terser()
    ]
};