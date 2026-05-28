// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default {
	input: 'src/main.ts',
	output: {
		file: 'frills.js', // Change to desired output
		format: 'es',
    strict: false
	},
	plugins: [
        resolve({ extensions: ['.ts', '.js'] }),
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