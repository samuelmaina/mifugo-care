const express = require('express');

const middlewares = require('./appMiddlewares');
const routesLoader = require('./routesLoader');
const loadMiddlewares = require('./loadMiddlewares');

const app = express();

const { first, last } = middlewares;
loadMiddlewares(app, first);
routesLoader(app);
loadMiddlewares(app, last);

module.exports = app;
