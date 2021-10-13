const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { entryHtmlFile, entryFile, buildDir, envFile } = require('./util/paths');
const { getNameTemplates } = require('./util/util');
const { Configuration, ProgressPlugin } = require('webpack');
const { WebpackPluginServe } = require('webpack-plugin-serve');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

/** @type {Configuration} */
const config = {
	name: 'serve',
	mode: 'development',
	entry: [
		entryFile,
		// https://www.npmjs.com/package/webpack-plugin-serve#usage
		'webpack-plugin-serve/client',
	],
	output: {
		...getNameTemplates('js', false),
		path: buildDir,
		pathinfo: false
	},
	stats: {
		children: true,
		builtAt: true,
		env: true
	},
	optimization: {
		minimize: false,
		mergeDuplicateChunks: false,
		mangleExports: false,
		removeAvailableModules: false,
		removeEmptyChunks: false,
		splitChunks: false,
		runtimeChunk: true
	},
	// https://www.npmjs.com/package/webpack-plugin-serve#usage
	watch: true,
	devtool: 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.d.ts']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							configFile: false
						}
					}
				]
			},
			{
				test: /\.tsx?$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							happyPackMode: true
						}
					}
				]
			},
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
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
				type: 'asset/inline'
			}
		]
	},
	plugins: [
		// https://www.npmjs.com/package/webpack-manifest-plugin
		// https://webpack.js.org/plugins/progress-plugin/
		// https://medium.com/@artempetrovcode/how-webpack-progressplugin-works-7e7301a3d919
		new ProgressPlugin(),
		new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
		new DotenvWebpackPlugin({ path: envFile }),
		new WebpackPluginServe({
			static: buildDir,
			host: 'localhost',
			port: 21321,
			open: false,
			status: true,
			compress: false,
			progress: true,
			waitForBuild: false,
			historyFallback: true,
			liveReload: true,
			ramdisk: ['darwin', 'linux'].includes(process.platform),
			hmr: 'refresh-on-failure'
		}),
		new HtmlWebpackPlugin({
			template: entryHtmlFile,
			inject: true,
			minify: false
		})
	]
};

module.exports = config;
