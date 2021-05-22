const jwt = require('jsonwebtoken');
const expiryTimeInSeconds = 300;

const { SESSION_SECRET } = require('../config/env');

exports.loginIn = (payload, cb) => {
	const config = {
		expiresIn: expiryTimeInSeconds,
	};
	jwt.sign(payload, SESSION_SECRET, config, cb);
};
