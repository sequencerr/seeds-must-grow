const express = require('express');
const app = express();
var engines = require('consolidate')
const expressStaticGzip = require('express-static-gzip');
const { resolve } = require('path');

const port = process.env.PORT || 5000;

app.use(express.static(resolve('build')));

app.get('/*', (_req, res) => {
	res.render(resolve('build', 'index.html'));
});

app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
