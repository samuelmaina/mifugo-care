const { Client, Vet } = require('../models');
const { auth } = require('../services');
const { Responder } = require('../utils');

exports.postSignUp = async function (req, res, next) {
	try {
		const responder = new Responder(res);
		const { body, params } = req;
		const { email } = body;
		const { type } = params;
		const exists = await findEmailByType(email, type);
		if (exists) {
			return responder
				.withStatusCode(401)
				.withError('Email already exists.Please try another one.')
				.send();
		}
		await createOneForType(body, type);
		return responder
			.withStatusCode(201)
			.withMessage('Successfully signed up.')
			.withData({
				type,
			})
			.send();
	} catch (error) {
		next(error);
	}
};

exports.postLogin = async function (req, res, next) {
	try {
		const responder = new Responder(res);
		const { loginIn } = auth;
		const { body, params } = req;
		const type = params.type;
		const { email, password } = body;

		const details = await findOneWithCredentialsByType(type, email, password);
		if (details) {
			const payload = {
				id: details.id,
			};
			const cb = (err, token) => {
				try {
					if (err) return next(err);
					const data = {
						success: true,
						auth: type,
						token: 'Bearer ' + token,
					};
					responder.withStatusCode(201).withData(data).send();
				} catch (error) {
					next(error);
				}
			};
			return loginIn(payload, cb);
		}
		responder.withStatusCode(401).withError('Invalid Email or Password').send();
	} catch (error) {
		next(error);
	}
};

exports.postReset = async (req, res, next) => {
	const { body } = req;
	const { email } = body;
};

const client = 'client';
const vet = 'vet';
async function findEmailByType(email, type) {
	switch (type) {
		case client:
			return await Client.findByEmail(email);
			break;
		case vet:
			return await Vet.findByEmail(email);
			break;
		default:
			throw new Error('Invalid type');
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
			throw new Error('Invalid type');
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
			throw new Error('Invalid type');
			break;
	}
}
