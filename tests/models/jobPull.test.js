const { JobPull } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearModel,
	createDocWithDataForType,
	clearDb,
	generateRandomMongooseId,
} = require('../utils');

const {
	ensureIdsAreEqual,
	ensureArraysAreEqual,
	ensureValueGreaterThanOrEqual,
	ensureValueLessThan,
} = require('../testUtil');

describe('JobPull', () => {
	includeSetUpAndTearDown();
	describe('JobPull', () => {
		const TRIALS = 2;
		let vet_id;
		let jobIds = [];
		let data;
		afterEach(async () => {
			await clearModel(JobPull);
		});
		beforeAll(async () => {
			vet_id = generateRandomMongooseId();
			for (let i = 0; i < TRIALS; i++) {
				jobIds.push(generateRandomMongooseId());
			}
			data = {
				vet_id,
				jobIds,
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			const doc = await JobPull.createOne(data);
			ensureIdsAreEqual(doc.vet_id, data.vet_id);
			ensureArraysAreEqual(doc.jobIds, data.jobIds);
		});
		describe('methods', () => {
			let doc;
			beforeEach(async () => {
				doc = await JobPull.createOne(data);
			});

			it('should add job to a pull', async () => {
				const newJobId = generateRandomMongooseId();
				await doc.addJobIdToPull(newJobId);
				const found = doc.jobIds.findIndex(job => {
					return job.toString() === newJobId.toString();
				});
				ensureValueGreaterThanOrEqual(found, 0);
			});
			it('should remove job from a pull', async () => {
				const firstJob = jobIds[0];
				await doc.removeJobIdFromPull(firstJob);
				const found = doc.jobIds.findIndex(job => {
					return job.toString() === firstJob.toString();
				});
				ensureValueLessThan(found, 0);
			});
		});
	});
});
