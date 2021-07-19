const { JobPull } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearModel,
	createDocWithDataForType,
	clearDb,
	generateRandomMongooseId,
	createJobPull,
	generateNMongooseIds,
	findIdInArrayOfIds,
	ensureTwoArraysHaveTheSameIds,
	generateReviewData,
	createVetDetails,
	createVet,
	createJob,
} = require('../utils');

const {
	ensureIdsAreEqual,
	ensureArraysAreEqual,
	ensureValueGreaterThanOrEqual,
	ensureValueLessThan,
} = require('../testUtil');

const TRIALS = 6;

describe('JobPull', () => {
	includeSetUpAndTearDown();
	describe('JobPull', () => {
		let data;
		afterEach(async () => {
			await clearDb();
		});
		beforeAll(async () => {
			const trials = 50;
			data = await generatePoolData(trials);
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			const doc = await JobPull.createOne(data);
			ensureIdsAreEqual(doc.vet_id, data.vet_id);
			ensureTwoArraysHaveTheSameIds(doc.job_ids, data.job_ids);
		});

		describe('After creation', () => {
			describe('statics', () => {
				let vetIds;
				beforeEach(async () => {
					vetIds = [];
					for (let j = 0; j < 2; j++) {
						const vet_id = generateRandomMongooseId();
						await createJobPull(vet_id, generateNMongooseIds(6));
						vetIds.push(vet_id);
					}
				});
				it('should find pull(s) for vet Id', async () => {
					const firstVet = vetIds[0];
					const lastVet = vetIds[vetIds.length - 1];
					const pool1 = await JobPull.findOneForVetId(firstVet);
					const pool2 = await JobPull.findOneForVetId(lastVet);
					ensureIdsAreEqual(pool1.vet_id, firstVet);
					ensureIdsAreEqual(pool2.vet_id, lastVet);
				});
			});

			describe('methods', () => {
				let doc;
				beforeEach(async () => {
					doc = await JobPull.createOne(data);
				});

				it('should add job to a pull', async () => {
					const newJobId = generateRandomMongooseId();
					await doc.addJobIdToPull(newJobId);
					const found = findIdInArrayOfIds(doc.job_ids, newJobId);
					ensureValueGreaterThanOrEqual(found, 0);
				});
				it('should remove job from a pull', async () => {
					const job_ids = data.job_ids;
					const firstJob = job_ids[0];
					await doc.removeJobIdFromPull(firstJob);
					const found = findIdInArrayOfIds(doc.job_ids, firstJob);
					ensureValueLessThan(found, 0);
				});
			});
		});
	});
});

async function generatePoolData(jobTrials) {
	const vet = await createVet('test1', 'test1@email.com', 'Pa55word??');
	const jobIds = [];
	for (let i = 0; i < jobTrials; i++) {
		const job = await createJob(
			vet.id,
			generateRandomMongooseId(),
			[3, 4],
			'spec 1'
		);
		jobIds.push(job.id);
	}
	return {
		vet_id: vet.id,
		job_ids: jobIds,
	};
}
