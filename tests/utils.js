const assert = require('assert');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = require('../app');
const Models = require('../models');

const { VetDetails } = require('../models');

const { connector } = require('../models/utils');
const { ensureIdsAreEqual, ensureObjectHasProp } = require('./testUtil');
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

exports.generateRandomMongooseId = () => {
	return mongoose.Types.ObjectId();
};
exports.generateRandomIntFromUpto = n => {
	return Math.ceil(Math.random() * n);
};

exports.createVetDetails = async (id, location, specialities) => {
	const data = {
		id,
		linkedInUrl: 'https:/linkedIn/example',
		experience: 2,
		location: {
			latitude: location[0],
			longitude: location[1],
		},
		speciality: specialities,
	};
	return await VetDetails.addDetails(data);
};

exports.createJobData = (vet_id, client_id, location, speciality) => {
	return {
		vet_id,
		client_id,
		location: {
			latitude: location[0],
			longitude: location[1],
		},
		speciality,
		files: [
			{ path: 'path/to/image1' },
			{ path: 'path/to/image2' },
			{ path: 'path/to/image3' },
		],
		description: 'The cow very unhealthy. ',
		amount: 1000,
	};
};

exports.createJob = async (vet_id, client_id, location, speciality) => {
	const data = this.createJobData(vet_id, client_id, location, speciality);
	return await Models.Job.createOne(data);
};
exports.createReview = async (job_id, rating) => {
	const data = {
		job_id,
		rating,
		comment: 'good service 1.',
	};
	return await Models.Review.createOne(data);
};
exports.createVet = async (email, password) => {
	return await Models.Vet.createOne({ email, password });
};
exports.createClient = async (email, password) => {
	return await Models.Client.createOne({ email, password });
};
exports.createJobPull = async (vet_id, job_ids) => {
	return await Models.JobPull.createOne({ vet_id, job_ids });
};
exports.createRecommendedJob = async (vet_id, job_id) => {
	return await Models.RecommendedJob.createOne({
		vet_id,
		job_id,
	});
};

exports.generateReviewData = noOfJobIds => {
	vet_id = this.generateRandomMongooseId();
	job_ids = this.generateNMongooseIds(noOfJobIds);
	return {
		vet_id,
		job_ids,
	};
};

exports.findIdInArrayOfIds = (arr, key) => {
	return arr.findIndex(id => {
		return id.toString() === key.toString();
	});
};

exports.ensureJobHasNecessaryFields = job => {
	const props = ['imageUrls', 'time', 'speciality', 'description'];
	props.forEach(prop => {
		ensureObjectHasProp(job, prop);
	});
};

exports.ensureTwoArraysHaveTheSameIds = (actual, expected) => {
	actual.forEach((element, index) => {
		ensureIdsAreEqual(element, expected[index]);
	});
};
exports.generateNMongooseIds = trials => {
	let ids = [];
	for (let i = 0; i < trials; i++) {
		ids.push(this.generateRandomMongooseId());
	}
	return ids;
};
