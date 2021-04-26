const express = require('express');
const passport = require('passport');

const { vetSetup, clientSetup } = require('../authMiddleware');
const vet = require('./vet');
const client = require('./client');

vetSetup(passport);
clientSetup(passport);

const router = express.Router();

const { ensureVetIsAuth, ensureClientIsAuth } = require('../authMiddleware');

exports.auth = require('./auth');

exports.vet = router.use(ensureVetIsAuth, vet);
exports.client = router.use(ensureClientIsAuth, client);
