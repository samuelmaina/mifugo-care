const { Client, Vet } = require('../models');
const jwt = require('jsonwebtoken');

const { SESSION_SECRET } = require('../config/env');

exports.postSignUp = async function (req, res, next) {
	try {
		const { body, params } = req;
		const { email } = body;
		const { type } = params;
		const existingEmail = await findEmainByType(email, type);
		if (existingEmail) {
			const error = 'Email already exists.Please try another one.';
			return res.status(401).json({
				error,
			});
		}
		await createOneForType(body, type);
		return res.status(201).json({
			message: 'Successfully signed up.',
		});
	} catch (error) {
		next(error);
	}
};

exports.postLogin = async function (req, res, next) {
	try {
		const expiryTimeInSeconds = 3600;
		const { body, params } = req;
		const type = params.type;
		const { email, password } = body;

		const details = await findOneWithCredentialsByType(type, email, password);
		if (details) {
			const payload = {
				id: details.id,
			};

			jwt.sign(
				payload,
				SESSION_SECRET,
				{ expiresIn: expiryTimeInSeconds },
				(err, token) => {
					if (err) return next(err);
					return res.status(201).json({
						success: true,
						token: 'Bearer ' + token,
					});
				}
			);
		} else
			return res.status(404).json({
				error: 'Invalid Email or Password',
			});
	} catch (error) {
		next(error);
	}
};

const client = 'client';
const vet = 'vet';
async function findEmainByType(email, type) {
	switch (type) {
		case client:
			return await Client.findByEmail(email);
			break;
		case vet:
			return await Vet.findByEmail(email);
			break;
		default:
			return null;
			break;
	}
}

async function findOneWithCredentialsByType(type, email, password) {
	switch (type) {
		case client:
			return await Client.findOneWithCredentials(email, password);
			break;
		case vet:
			return await Vet.findOneWithCredentials(email, password);
			break;
		default:
			return null;
			break;
	}
}

async function createOneForType(body, type) {
	switch (type) {
		case client:
			return await Client.createOne(body);
			break;
		case vet:
			return await Vet.createOne(body);
			break;
		default:
			return null;
			break;
	}
}
