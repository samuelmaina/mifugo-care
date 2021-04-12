const express = require('express');

const middlewares = require('./appMiddlewares');
const routerLoader = require('./routeLoader');

const app = express();

for (const key in middlewares) {
	middlewares[key](app);
}
routerLoader(app);

module.exports = app;
