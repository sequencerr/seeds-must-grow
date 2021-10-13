const { paramCase } = require('param-case');
const { parse } = require('path');
const { Chunk, NormalModule } = require('webpack');

// https://gist.github.com/davidgilbertson/c9af3e583f95de03439adced007b47f1/raw/593985463f3eaceabe9b288da651805d79961174/webpack.config.js
/**
 * @param {NormalModule} m
 * @param {Chunk[]} _selectedChunks
 * @param {string} cacheGroup
 * @returns {string}
 */
module.exports.nameFixer = (m, _selectedChunks, cacheGroup) =>
	`${cacheGroup}-${paramCase(parse(m.identifier()).name.replace('@', ''))}`;

// https://github.com/webpack/loader-utils/#interpolatename
/**
 * @param {string} filetype
 * @param {boolean | null} hash
 * @returns
 */
module.exports.getNameTemplates = (filetype, hash = true) => {
	const hashStr = hash ? '.[contenthash:8]' : '';
	const filename = `static/${filetype}/[name]${hashStr}.bundle.${filetype}`;
	return {
		filename,
		chunkFilename: filename.replace(/bundle\..+$/, 'chunk.$&'),
		assetModuleFilename: `static/media/[name]${hashStr}.[ext][query]`
	};
};

/**
 * @param {Record<string, string>} o Any object
 * @param {string[]} ps Properties
 * @returns {Omit<o, ps>} Object without specified properties
 */
module.exports.omit = (o, ...ps) =>
	Object.keys(o).reduce((r, p) => {
		if (!ps.includes(p)) r[p] = o[p];
		return r;
	}, {});
