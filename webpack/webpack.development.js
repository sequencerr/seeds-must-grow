const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { mergeWithRules } = require('webpack-merge');
const { entryHtmlFile, entryFile, buildDir } = require('./util/paths');
const { mergeRules } = require('./util/util');
const common = require('./webpack.common');
const { Configuration } = require('webpack');
const { WebpackPluginServe } = require('webpack-plugin-serve');

/** @type {Configuration} */
const config = {
	entry: [
		entryFile,
		// https://www.npmjs.com/package/webpack-plugin-serve#usage
		'webpack-plugin-serve/client'
	],
	name: 'serve',
	mode: 'development',
	stats: {
		children: true,
		builtAt: true,
		env: true
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/i,
				use: [
					// Fall back to style-loader in development
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							// https://webpack.js.org/loaders/css-loader/#options
							// https://webpack.js.org/loaders/css-loader/#object-2
							modules: false,
							// 0 => no loaders (default)
							// 1 => postcss-loader;
							// 2 => postcss-loader, sass-loader
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									['postcss-preset-env'],
									[
										autoprefixer([
											'last 1 chrome version',
											'last 1 firefox version',
											'last 1 safari version'
										])
									]
								]
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new WebpackPluginServe({
			static: buildDir,
			host: 'localhost',
			port: 21321,
			open: true,
			status: true,
			compress: true,
			progress: true,
			waitForBuild: true,
			historyFallback: true
		}),
		new HtmlWebpackPlugin({
			template: entryHtmlFile,
			inject: true
		})
	],
	// https://www.npmjs.com/package/webpack-plugin-serve#usage
	watch: true,
	devtool: 'eval-cheap-module-source-map'
};

module.exports = mergeWithRules(mergeRules)(common, config);
