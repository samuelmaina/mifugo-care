const express = require('express');
const path = require('path');

const middlewares = require('./appMiddlewares');
const routesLoader = require('./routesLoader');
const loadMiddlewares = require('./loadMiddlewares');
const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res, next) => {
	try {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	} catch (error) {
		next(error);
	}
});

const { first, last } = middlewares;
loadMiddlewares(app, first);
routesLoader(app);
loadMiddlewares(app, last);

module.exports = app;
