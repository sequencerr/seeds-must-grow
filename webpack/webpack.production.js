const autoprefixer = require('autoprefixer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { Configuration, ProgressPlugin } = require('webpack');
const { entryHtmlFile, buildDir, envFile, entryFile } = require('./util/paths');
const { getNameTemplates, nameFixer, omit } = require('./util/util');
const TerserPlugin = require('terser-webpack-plugin');
const { constants } = require('zlib');
const { readdirSync } = require('fs');
const CompressionPlugin = require('compression-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const { parse, ParsedPath } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

const BrotliCompressionPlugin = CompressionPlugin;
/** @type {ParsedPath[]} */
const files = [];
const compressFileExtensions = /\.(js|css|html)$/;
const exts = ['.gz', '.br'];

/** @type {Configuration} */
const config = {
	name: 'build',
	mode: 'production',
	target: 'web',
	entry: entryFile,
	output: {
		...getNameTemplates('js'),
		path: buildDir
	},
	performance: {
		hints: 'warning',
		maxAssetSize: Infinity,
		maxEntrypointSize: Infinity
	},
	optimization: {
		minimize: true,
		chunkIds: 'named',
		runtimeChunk: 'multiple',
		splitChunks: {
			chunks: 'all',
			minChunks: 1,
			minSize: 1,
			minRemainingSize: 0,
			maxSize: 244, // Recommended limit is 244 KB
			maxAsyncRequests: 30,
			maxInitialRequests: Infinity,
			enforceSizeThreshold: 50000,
			cacheGroups: {
				react: {
					test: /[\\/]node_modules[\\/](react.*)[\\/]/,
					name: 'react',
					reuseExistingChunk: true
				},
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: nameFixer,
					reuseExistingChunk: true
				}
			}
		},
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
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.d.ts']
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							configFile: false,
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
								[
									'@babel/preset-react',
									{
										runtime: 'automatic'
									}
								]
							],
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{
										regenerator: true
									}
								]
							]
						}
					}
				]
			},
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
					},
					// Correct order (uses from end): sass-loader => postcss-loader => css-loader => style-loader/mini-css => null-loader
					{
						loader: 'sass-loader',
						// https://webpack.js.org/loaders/sass-loader/#options
						options: {}
					}
				]
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				// https://webpack.js.org/configuration/module/#ruletype
				type: 'asset/resource'
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/i,
				type: 'asset/inline'
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack', 'svgo-loader']
			}
		]
	},
	plugins: [
		// https://www.npmjs.com/package/webpack-manifest-plugin
		// https://webpack.js.org/plugins/progress-plugin/
		// https://medium.com/@artempetrovcode/how-webpack-progressplugin-works-7e7301a3d919
		new ProgressPlugin(),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*']
		}),
		new DotenvWebpackPlugin({
			path: envFile
		}),
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
		new MiniCssExtractPlugin(omit(getNameTemplates('css'), 'assetModuleFilename'))
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

module.exports = config;
