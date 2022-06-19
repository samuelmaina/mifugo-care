const express = require("express");
const path = require("path");

const middlewares = require("./appMiddlewares");
const routesLoader = require("./routesLoader");
const loadMiddlewares = require("./loadMiddlewares");
const app = express();
app.use("/Data/Images", express.static(path.join(__dirname, "Data", "Images")));

app.use(express.static(path.join(__dirname, "client", "build")));

const { first, last } = middlewares;
loadMiddlewares(app, first);
routesLoader(app);

app.get("*", (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  } catch (error) {
    next(error);
  }
});

loadMiddlewares(app, last);

module.exports = app;
