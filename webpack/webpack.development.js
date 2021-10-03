const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { mergeWithRules } = require('webpack-merge');
const { entryHtmlFile, srcDir } = require('./util/paths');
const { mergeRules } = require('./util/util');
const common = require('./webpack.common');

/** @type {Configuration & DevServerConfiguration} */
const config = {
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
		new HtmlWebpackPlugin({
			template: entryHtmlFile,
			inject: true
		}),
		new HotModuleReplacementPlugin()
	],
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		contentBase: srcDir,
		port: 21321,
		hot: true,
		compress: true,
		open: true,
		historyApiFallback: true
	}
};

module.exports = mergeWithRules(mergeRules)(common, config);
