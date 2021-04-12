const express = require('express');
const passport = require('passport');

const { vetSetup } = require('../authMiddleware');
const vet = require('./vet');

vetSetup(passport);

const router = express.Router();

const { ensureVetIsAuth } = require('../authMiddleware');

exports.auth = require('./auth');

exports.vet = router.use(ensureVetIsAuth, vet);
