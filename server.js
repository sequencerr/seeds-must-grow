const express = require('express');
const app = express();
const expressStaticGzip = require('express-static-gzip');
const { resolve } = require('path');
// const engines = require('consolidate');

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;

// if (NODE_ENV != 'production') return;

app.use(express.static(resolve('build')));
// "Cannot GET /" https://stackoverflow.com/a/59203812
app.set('view options', { layout: false });

// "Cannot find module 'html'" https://stackoverflow.com/questions/16111386/error-cannot-find-module-html/62611449
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

app.get('/', (_req, res) => {
	res.render(resolve('build', 'index.html'));
});
// app.get('*', (_req, res) => {
// 	res.sendFile(resolve('build', 'index.html'));
// });
// https://github.com/tkoenig89/express-static-gzip#behavior-warning
// https://tech.groww.in/enable-brotli-compression-in-webpack-with-fallback-to-gzip-397a57cf9fc6
app.use(
	'/build',
	expressStaticGzip('/build', {
		index: false,
		enableBrotli: true,
		orderPreference: ['br', 'gz'],
		serveStatic: {
			maxAge: 31536000 // 1 year
		}
	})
);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
