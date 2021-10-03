const { realpathSync } = require('fs');
const { resolve } = require('path');

const rootDir = realpathSync(process.cwd());
const srcDir = resolve(rootDir, 'src');
const buildDir = resolve(rootDir, 'build');
const envFile = resolve(rootDir, '.env');
const entryFile = resolve(srcDir, 'index.tsx');
const publicPath = resolve(rootDir, 'public');
const entryHtmlFile = resolve(publicPath, 'index.html');

module.exports = {
	rootDir,
	srcDir,
	buildDir,
	envFile,
	entryFile,
	entryHtmlFile
};
