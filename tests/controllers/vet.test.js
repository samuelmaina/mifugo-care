const request = require('supertest');

const { VetDetails, Job, JobPull, RecommendedJob } = require('../../models');

const {
	ensureEqual,
	ensureArrayHasElement,
	ensureIdsAreEqual,
	ensureObjectHasProp,
	ensureNull,
} = require('../testUtil');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
	generateRandomMongooseId,
	createJobPull,
	createVetDetails,
	createJob,
	generateRandomIntFromUpto,
	createRecommendedJob,
	ensureJobHasNecessaryFields,
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

describe('Vet', () => {
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
			location: [3, 4],
			linkedInUrl: '/linkedIn/username1/newLinkedIn',
			speciality: 'dog',
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
			const url = '/vet/edit-details';

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
				await createVetDetails(vet_id, details.location, details.speciality);
			});

			it('should editDetails For vet', async () => {
				const url = '/vet/edit-details';
				const details = {
					experience: 5,
					location: [3, 4],
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
			it('should view job pull', async () => {
				const trials = 50;
				const url = '/vet/job-pool';
				let jobs = await generateJobsForVetId(vet_id, trials);
				let jobIds = [];
				for (const job of jobs) {
					jobIds.push(job.id);
				}
				await createJobPull(vet_id, jobIds);
				const res = await makeGetRequest(url);
				ensureResHasStatusCodeAndProp(res, 201, 'jobs');
				for (const job of res.body.jobs) {
					ensureJobHasNecessaryFields(job.job_id);
				}
			});
			it('should add job to job pool', async () => {
				const status = 'allocated';
				const url = '/vet/add-to-pull';
				const job = await createJob(
					null,
					generateRandomMongooseId(),
					details.location,
					'dog'
				);
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
				const found = await Job.findById(body.job_id);
				//ensure job is asigned to this vet
				ensureIdsAreEqual(found.vet_id, vet_id);
				//ensure change in status.
				ensureEqual(found.status, status);
				//ensure removed from the recommended jobs.
				ensureNull(await RecommendedJob.findOne({ job_id: job.id }));
			});
			it('should remove job from pool', async () => {
				const trails = 10;
				const url = '/vet/remove-from-pull';

				const jobIds = [];
				for (let i = 0; i < trails; i++) {
					const job = await createJob(
						vet_id,
						generateRandomMongooseId(),
						[89, 88],
						`spec ${i}`
					);
					jobIds.push(job.id);
				}

				const body = {
					job_id: jobIds[0],
				};
				await createJobPull(vet_id, jobIds);
				const res = await makePostRequest(url, body);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Job successfully removed from pool.`
				);
				ensureNull(await RecommendedJob.findOne({ job_id: jobIds[0] }));
			});
			it('should set Price for a job', async () => {
				const url = '/vet/set-job-price';
				const job = await createJob(
					vet_id,
					generateRandomMongooseId(),
					details.location,
					details.speciality
				);

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
				resJobs.forEach(job => {
					ensureIdsAreEqual(job.job_id.vet_id, vet_id);
					ensureJobHasNecessaryFields(job.job_id);
				});
			});
			it('should view  all the recommended jobs', async () => {
				const url = '/vet/recommended-jobs';
				const noOfJobs = 10;
				for (let i = 0; i < noOfJobs; i++) {
					const job = await createJob(
						vet_id,
						generateRandomMongooseId(),
						[generateRandomIntFromUpto(10), generateRandomIntFromUpto(10)],
						`spec ${i}`
					);
					await createRecommendedJob(vet_id, job.id);
				}
				const res = await makeGetRequest(url);
				ensureResHasStatusCodeAndProp(res, 201, 'jobs');
				for (const job of res.body.jobs) {
					ensureJobHasNecessaryFields(job.job_id);
				}
			});
		});
	});

	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
	async function makeGetRequest(url) {
		return await request(app).get(url).set('Authorization', token);
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
		let jobs = [];
		for (let i = 0; i < trials; i++) {
			const job = await createJob(
				vet_id,
				generateRandomMongooseId(),
				[23, 45],
				'dog'
			);
			jobs.push(job);
		}
		return jobs;
	}
	function generateLocation() {
		return {
			latitude: Math.ceil(Math.random() * 20),
			longitude: Math.ceil(Math.random() * 20),
		};
	}
});
