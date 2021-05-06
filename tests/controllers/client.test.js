const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { Job } = require('../../models');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
} = require('../utils');

const { ensureResHasStatusCodeAndFieldData } = require('./utils');

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
		expect(res2.status).toBe(401);
	});

	describe('when logged in ', () => {
		let doc;
		let details;

		const file = './tests/data/natalie.jpg';
		const imageField = 'image';

		const imagePath = path.resolve(file);

		beforeEach(async () => {
			const type = 'client';
			doc = await createDocWithDataForType(type, data);
			const loginUrl = `/auth/log-in/${type}`;
			const res = await request(app).post(loginUrl).send(data);
			token = res.body.token;
			details = {
				client_id: doc.id,
				speciality: 'dog',
				location: 'some/locatio/there',
				description: 'The dog is problematic',
			};
		});

		describe('Job upload', () => {
			afterEach(done => {
				const deletePath = path.resolve('./Data/Images');
				fs.readdir(deletePath, (err, files) => {
					if (err) throw new Error(err);
					for (const file of files) {
						fs.unlink(path.join(deletePath, file), err => {
							if (err) throw new Error(err);
						});
					}
					done();
				});
			});

			it('should post new job', async () => {
				const url = '/client/post-job';
				const res = await makePostRequestWithFile(
					url,
					imageField,
					imagePath,
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
				details.imageUrl = 'some/file/somewhere';
				job = await Job.createOne(details);
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
		});
	});

	async function makePostRequestWithFile(url, filefield, filepath, body) {
		const req = request(app).post(url).set('Authorization', token);
		for (const key in body) {
			if (body.hasOwnProperty.call(body, key)) {
				req.field(key, body[key]);
			}
		}
		return await req.attach(filefield, filepath);
	}
	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
});
