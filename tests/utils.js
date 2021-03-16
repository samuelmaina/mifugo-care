const assert = require('assert');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = require('../app');

const Models = require('../models');

const { connector } = require('../models/utils');
const MONGO_TEST_URI = process.env.MONGO_TEST_URI;

const connectToDb = async () => {
	try {
		await connector(MONGO_TEST_URI);
	} catch (error) {
		throw new Error(error);
	}
};

const closeConnectionToBd = async () => {
	try {
		await mongoose.disconnect();
	} catch (error) {
		throw new Error(error);
	}
};

exports.includeSetUpAndTearDown = () => {
	beforeAll(async () => {
		await connectToDb();
	});
	afterAll(async () => {
		await closeConnectionToBd();
	});
};
exports.clearModel = async Model => {
	const noOfDocs = async () => {
		return await Model.countDocuments();
	};
	await Model.deleteMany();
	const countAfterDeletion = await noOfDocs();
	assert.strictEqual(
		countAfterDeletion,
		0,
		`the model (${Model.modelName} not cleared completely.`
	);
};

exports.clearDb = async () => {
	try {
		for (const ModelName in Models) {
			const Model = Models[ModelName];
			const getNoOfDocs = async () => {
				return await Model.find().countDocuments();
			};
			let count = await getNoOfDocs();
			if (count > 0) {
				await this.clearModel(Model);
			}
			count = await getNoOfDocs();
			assert.strictEqual(count, 0, 'deletion not complete');
		}
	} catch (error) {
		throw new Error(error);
	}
};

exports.hashPassword = async password => {
	return await bcrypt.hash(password, 12);
};

exports.confirmPassword = async (password, hashePassword) => {
	return await bcrypt.compare(password, hashePassword);
};

let server;

exports.startApp = async PORT => {
	await connectToDb();
	server = app.listen(PORT);
	return server;
};
exports.closeApp = async () => {
	if (!server) {
		throw new Error("Server not started, hence can't close it");
	}
	server.close(err => {
		if (err) {
			throw new Error(err);
			//although the server unlistened from the current port, it is still running,
			//and jest will warn of some unstopped operations.
		}
	});
	await closeConnectionToBd();
};

exports.createDocWithDataForType = async (type, data) => {
	let Model;
	const { Client, Vet } = Models;
	switch (type) {
		case 'client':
			Model = Client;
			break;
		case 'vet':
			Model = Vet;
			break;

		default:
			break;
	}
	const password = await this.hashPassword(data.password);

	let doc;
	doc = new Model({
		name: data.name,
		email: data.email,
		password,
	});
	doc = await doc.save();
	return doc;
};
