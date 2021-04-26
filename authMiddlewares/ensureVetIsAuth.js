const passport = require('passport');

const { vetAuth } = require('../config/general');

const strategy = vetAuth.local;
const config = {
	session: false,
};

module.exports = passport.authenticate(strategy, config);
