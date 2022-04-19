import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete'

const args = minimist(process.argv.slice(2));
const isProduction = args.configProduction;

import pkg from '../package.json';
const productionMode = isProduction
	? terser({
			keep_classnames: true,
			keep_fnames: true,
			output: {
				comments: false
			}
	  })
	: [];

const createPackageConfig = () => {
	const output = {
		esm: {
			file: pkg.module,
			format: `es`
		},
		cjs: {
			file: pkg.main,
			format: `cjs`
		},
		umd: {
			file: 'dist/cachet.js.umd.js',
			format: 'umd',
			name: 'cachet'
		}
	};

	const packageFormats = Object.keys(output);
	return packageFormats.map((format) => createRollupConfig(output[format]));
};

function createRollupConfig(output) {
	return {
		input: path.resolve('src', 'index.ts'),
		output,
		plugins: [
			nodeResolve(),
			typescriptPlugin({
				tsconfig: path.resolve('tsconfig.json'),
				cacheRoot: path.resolve('node_modules'),
        clean: true,
			}),
			productionMode,
		],
		inlineDynamicImports: true,
    external: ['cross-fetch', 'cross-fetch/polyfill'],
	};
}

const config = [
  ...createPackageConfig(),
  {
    input: './dist/src/index.d.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [
      dts(),
      del({ targets: 'dist/src/', hook: 'buildEnd' }),
    ],
  }
]

export default config;