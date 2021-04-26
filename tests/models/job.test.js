const { Job } = require('../../models');
const {
	ensureObjectsHaveSameValuesForProps,
	ensureEqual,
	ensureIsTruthy,
} = require('../testUtil');

const {
	includeSetUpAndTearDown,
	clearModel,
	generateRandomMongooseId,
	clearDb,
} = require('../utils');

describe('Job', () => {
	includeSetUpAndTearDown();
	describe('Job', () => {
		let vet_id;
		let client_id;
		let data;
		afterEach(async () => {
			await clearModel(Job);
		});
		beforeAll(async () => {
			vet_id = generateRandomMongooseId();
			client_id = generateRandomMongooseId();
			data = {
				vet_id,
				client_id,
				location: {
					latitude: 3,
					longitude: 4,
				},
				imageUrl: '/path/to/image.jpg',
				description: 'The cow very unhealthy. ',
				amount: 1000,
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			const doc = await Job.createOne(data);
			const props = ['vet_id', 'client_id', 'location', 'amount'];
			ensureObjectsHaveSameValuesForProps(props, doc, data);
		});

		describe('statics', () => {
			it('findAllForVetId', async () => {
				const trials = 50;
				for (let i = 0; i < trials; i++) await Job.createOne(data);
				const docs = await Job.findAllForVetId(data.vet_id);
				ensureEqual(docs.length, trials);
			});
		});
		describe('methods', () => {
			let doc;
			beforeEach(async () => {
				doc = await Job.createOne(data);
			});
			it('should mark a job as paid', async () => {
				await doc.markAsPaid();
				ensureIsTruthy(doc.isPaid);
			});
		});
	});
});
