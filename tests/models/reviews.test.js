const { Review, Job } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearModel,
	clearDb,
	generateRandomMongooseId,
	createReview,
	createJobData,
} = require('../utils');
const {
	ensureIdsAreEqual,
	ensureObjectsHaveSameValuesForProps,
} = require('../testUtil');
const { vet } = require('../../services');

describe('Reviews', () => {
	includeSetUpAndTearDown();
	describe('Reviews', () => {
		let data;
		afterEach(async () => {
			await clearDb();
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
			describe('should  find review by job id', () => {
				beforeEach(async () => {
					for (let index = 0; index < TRIALS; index++) {
						const job_id = generateRandomMongooseId();
						jobIds.push(job_id);
						const data = {
							job_id,
							rating: Math.random() * 5,
							comment: `good service ${index}.`,
						};
						await createReview(data.job_id, data.rating);
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

			it('should  find reviews for Vet Id', async () => {
				const trials = 50;
				const vetIds = [];
				for (let i = 0; i < trials; i++) {
					const vetId = generateRandomMongooseId();
					vetIds.push(vetId);
					const data = createJobData(
						vetId,
						generateRandomMongooseId(),
						[90, 23],
						`special ${i}`
					);
					const job = await Job.createOne(data);
					await createReview(job.id, Number((Math.random() * 5).toFixed(1)));
				}
				const trialVetId = vetIds[0];
				let retrieved = await Review.findAllForVetId(trialVetId);
				for (const doc of retrieved) {
					ensureIdsAreEqual(doc.job_id.vet_id, trialVetId);
				}
			});
		});
	});
});
