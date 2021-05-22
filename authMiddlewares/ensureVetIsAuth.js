const passport = require('passport');

const vetSetup = require('./vetSetup');

const { vetAuth } = require('../config/general');

vetSetup(passport);

const strategy = vetAuth.local;
const config = {
	session: false,
};

module.exports = passport.authenticate(strategy, config);
