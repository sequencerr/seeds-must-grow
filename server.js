const express = require('express');
const app = express();
const expressStaticGzip = require('express-static-gzip');
const { resolve } = require('path');

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;

if (NODE_ENV != 'production') return;

// https://tech.groww.in/enable-brotli-compression-in-webpack-with-fallback-to-gzip-397a57cf9fc6
app.use(
	'/build',
	expressStaticGzip('build', {
		enableBrotli: true,
		orderPreference: ['br', 'gz'],
		serveStatic: {
			setHeaders: (res, _) => res.setHeader('Cache-Control', 'public, max-age=31536000') // 1 year
		}
	})
);
app.use(express.static(resolve(__dirname, 'build')));
// "Heroku Cannot GET /" https://stackoverflow.com/a/59203812
app.get('*', (_req, res) => {
	res.sendFile(resolve(__dirname, 'build', 'index.html'));
});

app.set('view options', { layout: false });
app.get('/', (_req, res) => {
	res.render('/build/index.html');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
