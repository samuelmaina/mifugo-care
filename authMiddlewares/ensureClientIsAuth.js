const passport = require('passport');

const { clientAuth } = require('../config/general');

const strategy = clientAuth.local;
const config = {
	session: false,
};

module.exports = passport.authenticate(strategy, config);
