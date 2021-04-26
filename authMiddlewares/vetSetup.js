const passportJWT = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJWT;

const { Vet } = require('../models');
const { SESSION_SECRET } = require('../config/env');
const { vetAuth } = require('../config/general');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SESSION_SECRET;

const local = new Strategy(opts, async (payload, done) => {
	const { name, id, email } = await Vet.findById(payload.id);
	const data = { name, id, email };
	done(null, data);
});

module.exports = passport => {
	passport.use(vetAuth.local, local);
};
