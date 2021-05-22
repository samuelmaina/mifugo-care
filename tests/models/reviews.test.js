const { Review } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearModel,
	clearDb,
	generateRandomMongooseId,
} = require('../utils');
const {
	ensureIdsAreEqual,
	ensureObjectsHaveSameValuesForProps,
} = require('../testUtil');

describe('Reviews', () => {
	includeSetUpAndTearDown();
	describe.skip('Reviews', () => {
		let data;
		afterEach(async () => {
			await clearModel(Review);
		});
		beforeAll(async () => {
			data = {
				job_id: generateRandomMongooseId(),
				rating: 1,
				comment: 'good service 1.',
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			const doc = await Review.createOne(data);
			ensureIdsAreEqual(doc.job_id, data.job_id);
			const props = ['rating', 'comment'];
			ensureObjectsHaveSameValuesForProps(props, doc, data);
		});

		describe('statics', () => {
			const TRIALS = 20;
			let jobIds = [];
			beforeEach(async () => {
				for (let index = 0; index < TRIALS; index++) {
					const job_id = generateRandomMongooseId();
					jobIds.push(job_id);
					const data = {
						job_id,
						rating: Math.random() * 5,
						comment: `good service ${index}.`,
					};
					await Review.createOne(data);
				}
			});
			it('should  find review by job id', async () => {
				const job_id1 = jobIds[0];
				const last_job_id = jobIds[jobIds.length - 1];
				let retrieved = await Review.findReviewByJobId(job_id1);
				ensureIdsAreEqual(retrieved.job_id, job_id1);
				retrieved = await Review.findReviewByJobId(last_job_id);
				ensureIdsAreEqual(retrieved.job_id, last_job_id);
			});
		});
	});
});
