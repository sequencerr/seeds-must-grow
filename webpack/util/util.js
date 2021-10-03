const { paramCase } = require('param-case');
const { parse } = require('path');
const { Chunk, NormalModule } = require('webpack');

// https://github.com/survivejs/webpack-merge#mergewithrules
module.exports.mergeRules = {
	module: {
		rules: {
			test: 'match',
			use: 'prepend'
		}
	}
};

// https://gist.github.com/davidgilbertson/c9af3e583f95de03439adced007b47f1/raw/593985463f3eaceabe9b288da651805d79961174/webpack.config.js
/**
 * @param {NormalModule} m
 * @param {Chunk[]} _selectedChunks
 * @param {string} cacheGroup
 * @returns {string}
 */
module.exports.nameFixer = (m, _selectedChunks, cacheGroup) =>
	`${cacheGroup}-${paramCase(parse(m.identifier()).name.replace('@', ''))}`;

/**
 * @param {string} f
 * @returns {string}
 */
const baseName = f => `static/${f}/[name].[contenthash:8]`;
module.exports.baseName = baseName;

// https://github.com/webpack/loader-utils/#interpolatename
/**
 * @param {string} filetype
 * @param {string} folder
 * @returns
 */
module.exports.getNameTemplate = (filetype, folder = filetype) => {
	return {
		nameTemplate: `${baseName(folder)}.bundle.${filetype}`,
		chunkNameTemplate: `${baseName(folder)}.chunk.bundle.${filetype}`
	};
};
