import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-import-css';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: production ? 'public/assets/bpmnfull.min.js': 'public/assets/bpmnfull.js',
		name:"BpmnAssets",
		format: 'umd',
		sourcemap: true
	},
	plugins: [
		nodeResolve({
			browser: true
		}),
		commonjs(), // converts date-fns to ES modules
		css({
			output: production ? 'bpmnfull.min.css' : 'bpmnfull.css',
			minify: true
		}),
		production && terser()
	]
};