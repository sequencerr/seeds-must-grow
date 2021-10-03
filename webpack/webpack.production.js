const autoprefixer = require('autoprefixer');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { Configuration } = require('webpack');
const { mergeWithRules } = require('webpack-merge');
const { entryHtmlFile } = require('./util/paths');
const { getNameTemplate, mergeRules } = require('./util/util');
const common = require('./webpack.common');

const { nameTemplate, chunkNameTemplate } = getNameTemplate('css');

/** @type {Configuration} */
const config = {
	optimization: {
		minimize: true,
		minimizer: [
			// https://www.npmjs.com/package/css-minimizer-webpack-plugin
			// https://webpack.js.org/plugins/css-minimizer-webpack-plugin
			new CssMinimizerPlugin({
				test: /\.css$/i,
				parallel: true,
				minimizerOptions: {
					preset: ['default', { discardComments: { removeAll: true } }]
				},
				minify: [CssMinimizerPlugin.cssoMinify, CssMinimizerPlugin.cleanCssMinify]
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
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
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
	]
};

module.exports = mergeWithRules(mergeRules)(common, config);
