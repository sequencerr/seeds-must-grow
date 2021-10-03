const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { Configuration, ProgressPlugin } = require('webpack');
const { buildDir, entryFile, envFile } = require('./util/paths');
const { baseName, getNameTemplate, nameFixer } = require('./util/util');
const { nameTemplate, chunkNameTemplate } = getNameTemplate('js');

/** @type {Configuration} */
module.exports = {
	entry: entryFile,
	output: {
		path: buildDir,
		filename: nameTemplate,
		chunkFilename: chunkNameTemplate,
		assetModuleFilename: `${baseName('media')}.[ext][query]`
	},
	optimization: {
		chunkIds: 'named',
		minimize: false, // Will be minimized in production
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
		}
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/i,
				exclude: /node_modules/,
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
			},
			{
				test: /\.(sass|scss|css)$/i,
				use: [
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
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.d.ts']
	},
	plugins: [
		// https://webpack.js.org/plugins/progress-plugin/
		// https://medium.com/@artempetrovcode/how-webpack-progressplugin-works-7e7301a3d919
		new ProgressPlugin(),
		new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] }),
		new DotenvWebpackPlugin({ path: envFile }),
		// https://www.npmjs.com/package/webpack-manifest-plugin
	]
};
