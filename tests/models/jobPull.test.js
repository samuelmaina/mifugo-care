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

describe.skip('JobPull', () => {
	includeSetUpAndTearDown();
	describe('JobPull', () => {
		const TRIALS = 6;
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

		describe('After creation', () => {
			describe('statics', () => {
				let pools = [];
				beforeEach(async () => {
					for (let j = 0; j < 2; j++) {
						const vet_id = generateRandomMongooseId();
						let jobIds = [];

						for (let i = 0; i < TRIALS; i++) {
							jobIds.push(generateRandomMongooseId());
						}
						const data = {
							vet_id,
							jobIds,
						};
						pools.push(data);
						await JobPull.createOne(data);
					}
				});
				it('should find pull(s) for vet Id', async () => {
					const firstPool = pools[0];
					const lastPool = pools[pools.length - 1];
					const pool1 = await JobPull.findOneForVetId(firstPool.vet_id);
					const pool2 = await JobPull.findOneForVetId(lastPool.vet_id);
					firstPool.jobIds.forEach((element, index) => {
						expect(element.toString()).toEqual(pool1.jobIds[index].toString());
					});
					lastPool.jobIds.forEach((element, index) => {
						expect(element.toString()).toEqual(pool2.jobIds[index].toString());
					});
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
});
