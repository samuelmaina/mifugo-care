const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50MB' }));
app.use(bodyParser.json());

app.use('/auth', routes.auth);
app.use('/vet', routes.auth);

module.exports = app;
