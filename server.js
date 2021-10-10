const express = require('express');
const app = express();
const expressStaticGzip = require('express-static-gzip');
const { resolve } = require('path');

const { NODE_ENV, PORT } = process.env;
const port = PORT || 5000;

if (NODE_ENV != 'production') return;

// https://stackoverflow.com/questions/55353671/why-do-i-get-a-df-worker-min-js-was-loaded-even-though-its-mime-type-text-ht
// app.use('*.js', (_req, res, next) => {
// 	res.set('Content-Type', 'text/javascript');
// 	next();
// });
app.use(express.static(resolve(__dirname, 'build')));
// "Heroku Cannot GET /" https://stackoverflow.com/a/59203812
app.get('*', (_req, res) => {
	res.sendFile(resolve(__dirname, 'build', 'index.html'));
});

app.set('view options', { layout: false });
app.get('/', (_req, res) => {
	res.render('/build/index.html');
});

// https://github.com/tkoenig89/express-static-gzip#behavior-warning
// https://tech.groww.in/enable-brotli-compression-in-webpack-with-fallback-to-gzip-397a57cf9fc6
// app.use(
// 	'/build',
// 	expressStaticGzip('/build', {
// 		index: false,
// 		enableBrotli: true,
// 		orderPreference: ['br', 'gz'],
// 		serveStatic: {
// 			maxAge: 31536000 // 1 year
// 		}
// 	})
// );

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
