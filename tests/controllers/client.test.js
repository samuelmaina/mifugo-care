const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { Job, RecommendedJob } = require('../../models');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
	createJob,
	generateRandomMongooseId,
	ensureJobHasNecessaryFields,
} = require('../utils');

const {
	ensureResHasStatusCodeAndFieldData,
	ensureResHasStatusCodeAndProp,
} = require('./utils');
const { ensureEqual, ensureObjectHasProp } = require('../testUtil');

const PORT = 3420;

const data = {
	name: 'John Doe',
	email: 'johndoe@email.com',
	password: 'Pa55word??',
};

describe('Client', () => {
	let token;

	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterAll(async () => {
		await closeApp();
	});
	afterEach(async () => {
		await clearDb();
	});

	it('should refuse when user not logged in', async () => {
		const url = '/client/post-job';
		token = 'Bearer abkljrklejklejrkljeklrejjrklejr';
		const res2 = await makePostRequest(url, {});
		ensureEqual(res2.status, 401);
	});

	describe('when logged in ', () => {
		let doc;
		let details;

		const folder = './tests/data';
		const imageField = 'images';

		const imagesPath = path.resolve(folder);

		beforeEach(async () => {
			const type = 'client';
			doc = await createDocWithDataForType(type, data);
			const loginUrl = `/auth/log-in/${type}`;
			const res = await request(app).post(loginUrl).send(data);
			token = res.body.token;
			details = {
				location: '3, 4',
				speciality: 'dog',
				description: 'The cow very unhealthy. ',
			};
		});

		describe('Job upload', () => {
			afterEach(done => {
				const dirPath = path.resolve('./Data/Images');
				deleteFilesInDirAndExecuteDoneWhenThrough(dirPath, done);
			});

			it('should post new job', async () => {
				const url = '/client/post-job';
				const res = await makePostRequestWithFile(
					url,
					imageField,
					imagesPath,
					details
				);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					'Job posted successfully.'
				);
			});
		});
		describe('After creation', () => {
			let job;
			beforeEach(async () => {
				job = await createJob(null, doc.id, [34, 23], 'dog');
			});
			it('Should be review a job', async () => {
				const review = {
					job_id: job.id,
					rating: 4.5,
					comment: 'did a very good job',
				};
				const url = '/client/review-job';
				const res = await makePostRequest(url, review);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					'Review added successfully.'
				);
			});
			it('Should be able to pay a job', async () => {
				const paymnet = {
					job_id: job.id,
					amount: 4000,
					payment_method: 'M-Pesa',
				};
				const url = '/client/pay-job';
				await job.setAmount(paymnet.amount);
				const res = await makePostRequest(url, paymnet);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					'Payment successful.'
				);
			});
			it('Should be able to view all jobs', async () => {
				const client_id = generateRandomMongooseId();
				const trials = 20;
				for (let i = 0; i < trials; i++) {
					await createJob(
						generateRandomMongooseId(),
						client_id,
						[12, 34],
						`spec ${i}`
					);
				}
				const url = '/client/all-jobs';
				const res = await makeGetRequest(url);
				ensureResHasStatusCodeAndProp(res, 201, 'jobs');
				for (const job of res.body.jobs) {
					ensureJobHasNecessaryFields(job);
					ensureObjectHasProp(job, 'status');
				}
			});
		});
	});

	async function makePostRequestWithFile(url, filefield, dirPath, body) {
		const req = request(app).post(url).set('Authorization', token);

		for (const key in body) {
			if (body.hasOwnProperty.call(body, key)) {
				req.field(key, body[key]);
			}
		}
		const reading = new Promise((resolve, reject) => {
			fs.readdir(dirPath, async (err, files) => {
				if (err) resolve(err);
				for (const file of files) {
					req.attach(filefield, path.resolve(dirPath, file));
				}
				resolve(true);
			});
		});
		await reading;
		return await req;
	}
	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
	async function makeGetRequest(url, body) {
		return await request(app).get(url).set('Authorization', token);
	}
});

function deleteFilesInDirAndExecuteDoneWhenThrough(dirPath, done) {
	fs.readdir(dirPath, (err, files) => {
		if (err) throw new Error(err);
		for (const file of files) {
			fs.unlink(path.join(dirPath, file), err => {
				if (err) throw new Error(err);
			});
			done();
		}
	});
}
