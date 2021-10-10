const autoprefixer = require('autoprefixer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { Configuration } = require('webpack');
const { mergeWithRules } = require('webpack-merge');
const { entryHtmlFile } = require('./util/paths');
const { getNameTemplate, mergeRules } = require('./util/util');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
// const { constants } = require('zlib');
// const { readdirSync } = require('fs');

// const BrotliCompressionPlugin = CompressionPlugin;
// /** @type {ParsedPath[]} */
// const files = [];
// const compressFileExtensions = /\.(js|css|html)$/;
// const exts = ['.gz', '.br'];

const { nameTemplate, chunkNameTemplate } = getNameTemplate('css');

/** @type {Configuration} */
const config = {
	name: 'build',
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				minify: TerserPlugin.uglifyJsMinify,
				parallel: true,
				extractComments: true,
				terserOptions: {
					sourceMap: true,
					compress: true
				}
			}),
			// https://www.npmjs.com/package/css-minimizer-webpack-plugin
			// https://webpack.js.org/plugins/css-minimizer-webpack-plugin
			new CssMinimizerPlugin({
				minify: [CssMinimizerPlugin.cssoMinify, CssMinimizerPlugin.cleanCssMinify],
				parallel: true,
				minimizerOptions: {
					preset: ['default', { discardComments: { removeAll: true } }]
				}
			})
		]
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/i,
				use: [
					'null-loader',
					// https://webpack.js.org/plugins/mini-css-extract-plugin/
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// https://webpack.js.org/loaders/css-loader/#options
							// https://webpack.js.org/loaders/css-loader/#object-2
							modules: false
							// 0 => no loaders (default)
							// 1 => postcss-loader;
							// 2 => postcss-loader, sass-loader
							// 							ValidationError: Invalid options object. CSS Loader has been initialized using an options object that does not match the API schema.
							//  - options has an unknown property 'constLoaders'. These properties are valid:
							//    object { url?, import?, modules?, sourceMap?, importLoaders?, esModule?, exportType? }
							// constLoaders: 2
						}
					},
					{
						// https://webpack.js.org/loaders/postcss-loader/
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
									[autoprefixer(['>0.2%', 'not dead', 'not op_mini all'])]
								]
							}
						}
					}
				]
			}
		]
	},
	performance: {
		hints: 'warning',
		maxAssetSize: Infinity,
		maxEntrypointSize: Infinity
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: entryHtmlFile,
			inject: true,
			minify: {
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				removeComments: true,
				collapseWhitespace: true,
				useShortDoctype: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: nameTemplate,
			chunkFilename: chunkNameTemplate
		})
		// new CompressionPlugin({
		// 	// [path] placeholder is important here.
		// 	filename: '[path][base].gz[query]',
		// 	deleteOriginalAssets: false,
		// 	algorithm: 'gzip',
		// 	test: compressFileExtensions,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// }),
		// // https://webpack.js.org/plugins/compression-webpack-plugin/#using-brotli
		// new BrotliCompressionPlugin({
		// 	filename: '[path][base].br[query]',
		// 	deleteOriginalAssets: false,
		// 	algorithm: 'brotliCompress',
		// 	test: compressFileExtensions,
		// 	compressionOptions: { [constants.BROTLI_PARAM_QUALITY]: 11 },
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// }),
		// new RemovePlugin({
		// 	after: {
		// 		log: true,
		// 		trash: false,
		// 		emulate: false,
		// 		test: [
		// 			{
		// 				folder: buildDir,
		// 				recursive: true,
		// 				method: fp => {
		// 					// File examples
		// 					// package.scheduler-aa4471eb.e3708a886832068ba85a.bundle.js.br
		// 					// package.scheduler-aa4471eb.e3708a886832068ba85a.bundle.js.gz
		// 					// package.scheduler-aa4471eb.e3708a886832068ba85a.bundle.js <-- to remove
		// 					const { dir, base, ext } = parse(fp);

		// 					if (!compressFileExtensions.test(ext)) return false;
		// 					if (!files.length)
		// 						files.push(
		// 							...readdirSync(dir)
		// 								.map(parse)
		// 								.filter(f => exts.includes(f.ext))
		// 						);
		// 					if (files.filter(f => f.name == base && exts.includes(f.ext)).length == exts.length)
		// 						return true;

		// 					return false;
		// 				}
		// 			}
		// 		]
		// 	},
		// 	before: {
		// 		log: true,
		// 		trash: false,
		// 		emulate: false,
		// 		test: [
		// 			{
		// 				folder: buildDir,
		// 				method: () => true
		// 			}
		// 		]
		// 	}
		// })
	]
};

module.exports = mergeWithRules(mergeRules)(common, config);
