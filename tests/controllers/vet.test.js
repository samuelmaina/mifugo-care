const request = require('supertest');

const { VetDetails, Job, JobPull } = require('../../models');

const {
	ensureEqual,
	ensureArrayHasElement,
	ensureIdsAreEqual,
} = require('../testUtil');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
	generateRandomMongooseId,
} = require('../utils');

const {
	ensureResHasStatusCodeAndFieldData,
	ensureResHasStatusCodeAndProp,
} = require('./utils');

const PORT = 3420;

const data = {
	name: 'John Doe',
	email: 'johndoe@email.com',
	password: 'Pa55word??',
};

describe.skip('Vet', () => {
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
		const url = '/vet/add-details';
		token = 'Bearer abkljrklejklejrkljeklrejjrklejr';
		const res = await makePostRequest(url, {});
		ensureEqual(res.status, 401);
	});

	describe('when logged in ', () => {
		let vet_id;
		let name;
		const details = {
			experience: 5,
			location: { logitude: 3, latitude: 4 },
			linkedInUrl: '/linkedIn/username1/newLinkedIn',
			speciality: ['cats', 'cows', 'goats'],
		};
		beforeEach(async () => {
			const type = 'vet';
			const doc = await createDocWithDataForType(type, data);
			vet_id = doc.id;
			name = doc.name;
			const loginUrl = `/auth/log-in/${type}`;
			const res = await request(app).post(loginUrl).send(data);
			token = res.body.token;
		});
		it('should create new vet', async () => {
			const url = '/vet/add-details';

			const res = await makePostRequest(url, details);
			ensureResHasStatusCodeAndFieldData(
				res,
				201,
				'message',
				`Dear ${name}, Vet details added successfully.`
			);
		});

		describe('after creation', () => {
			beforeEach(async () => {
				details.id = vet_id;
				await VetDetails.addDetails(details);
			});

			it('should editDetails For vet', async () => {
				const url = '/vet/edit-details';
				const details = {
					experience: 5,
					location: { logitude: 3, latitude: 4 },

					linkedInUrl: '/linkedIn/username3455/newLinkedIn',
					speciality: ['sheep', 'cows', 'goats'],
				};

				const res = await makePostRequest(url, details);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Dear ${name}, Vet details updated successfully.`
				);
				const vetData = await VetDetails.findOne({
					personal_details_id: vet_id,
				});
				ensureArrayHasElement(vetData.speciality, 'sheep');
			});
			it('should add job to job pool', async () => {
				const url = '/vet/add-to-pull';
				const job = await generateJob();
				const body = {
					job_id: job.id,
				};

				const res = await makePostRequest(url, body);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Job successfully added to pool.`
				);
			});
			it('should add remove job from pool', async () => {
				const trails = 10;
				const url = '/vet/remove-from-pull';

				const jobIds = [];
				for (let i = 0; i < trails; i++) {
					jobIds.push(generateRandomMongooseId());
				}

				const body = {
					job_id: jobIds[0],
				};
				await JobPull.createOne({ vet_id, jobIds });
				const res = await makePostRequest(url, body);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Job successfully removed from pool.`
				);
			});

			it('should set Price for a job', async () => {
				const url = '/vet/set-job-price';
				const job = await generateJob();

				const body = {
					job_id: job.id,
				};

				const res = await makePostRequest(url, body);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Job price set successfully.`
				);
			});
			it('should view all jobs', async () => {
				const trials = 50;
				const url = '/vet/view-all-jobs';
				await generateJobsForVetId(vet_id, trials);
				const res = await makeGetRequest(url);
				ensureResHasStatusCodeAndProp(res, 201, 'jobs');
				const resJobs = res.body.jobs;
				ensureEqual(trials, resJobs.length);
				resJobs.forEach(element => {
					ensureIdsAreEqual(element.vet_id, vet_id);
				});
			});
		});
	});

	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
	async function makeGetRequest(url) {
		return await request(app).get(url).set('Authorization', token);
	}
	async function generateJob() {
		const client_id = generateRandomMongooseId();
		const data = {
			client_id,
			location: generateLocation(),
			imageUrl: '/path/to/image.jpg',
			description: 'The cow  looks very unhealthy. ',
		};
		return await Job.createOne(data);
	}
	async function generateJobsForVetIds(vet_ids) {
		for (const vet_id of vet_ids) {
			const client_id = generateRandomMongooseId();
			const data = {
				client_id,
				vet_id,
				location: generateLocation(),
				imageUrl: '/path/to/image.jpg',
				description: 'The cow  looks very unhealthy. ',
			};
			await Job.createOne(data);
		}
	}
	async function generateJobsForVetId(vet_id, trials) {
		for (let i = 0; i < trials; i++) {
			const client_id = generateRandomMongooseId();
			const data = {
				client_id,
				vet_id,
				location: generateLocation(),
				imageUrl: '/path/to/image.jpg',
				description: 'The cow  looks very unhealthy. ',
			};
			await Job.createOne(data);
		}
	}
	function generateLocation() {
		return {
			latitude: Math.ceil(Math.random() * 20),
			longitude: Math.ceil(Math.random() * 20),
		};
	}
});
