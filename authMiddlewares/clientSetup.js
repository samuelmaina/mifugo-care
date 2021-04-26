const passportJWT = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJWT;

const { Client } = require('../models');
const { SESSION_SECRET } = require('../config/env');
const { clientAuth } = require('../config/general');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SESSION_SECRET;

const local = new Strategy(opts, async (payload, done) => {
	const { id, name } = await Client.findById(payload.id);
	const data = { id, name };
	done(null, data);
});

module.exports = passport => {
	passport.use(clientAuth.local, local);
};
