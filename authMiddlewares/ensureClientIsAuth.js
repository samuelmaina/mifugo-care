const passport = require('passport');

const clientSetup = require('./clientSetup');

const { clientAuth } = require('../config/general');
clientSetup(passport);
const strategy = clientAuth.local;
const config = {
	session: false,
};

module.exports = passport.authenticate(strategy, config);
