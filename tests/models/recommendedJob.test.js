const { RecommendedJob } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearDb,
	generateRandomMongooseId,
	createJobPull,
	createRecommendedJob,
	generateNMongooseIds,
	ensureJobHasNecessaryFields,
	createJob,
} = require('../utils');
const {
	ensureIdsAreEqual,
	ensureObjectsHaveSameValuesForProps,
	ensureEqual,
	ensureObjectHasKeyValuePair,
	ensureObjectHasProp,
} = require('../testUtil');

describe('Recommended Jobs', () => {
	includeSetUpAndTearDown();
	afterEach(async () => {
		await clearDb();
	});
	it('should createOne', async () => {
		const data = {
			vet_id: generateRandomMongooseId(),
			job_id: generateRandomMongooseId(),
		};
		const recommended = await RecommendedJob.createOne(data);
		const props = ['vet_id', 'job_id'];
		ensureObjectsHaveSameValuesForProps(props, data, recommended);
	});

	it('should find all for vet Id', async () => {
		const vetIdsAndRecommondedJobs = [];

		const Trials = 10;
		const noOfVets = Math.ceil(Trials / 10);
		const vetIds = generateNMongooseIds(noOfVets);
		for (let i = 0; i < Trials; i++) {
			const vet_id = vetIds[i % noOfVets];
			const job = await createJob(
				vet_id,
				generateRandomMongooseId(),
				[34, 23],
				`spec ${i}`
			);
			const data = {
				vet_id,
				job_id: job.id,
			};
			vetIdsAndRecommondedJobs.push(data);
			await createRecommendedJob(data.vet_id, data.job_id);
		}
		const first = vetIds[0];
		const result = await RecommendedJob.findAllForVetId(first);
		ensureEqual(result.length, Math.ceil(Trials / noOfVets));

		result.forEach(job => {
			ensureIdsAreEqual(job.vet_id, first);
			ensureJobHasNecessaryFields(job.job_id);
		});
	});
});
