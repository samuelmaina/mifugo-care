const { Job } = require('../../models');

const {
	ensureObjectsHaveSameValuesForProps,
	ensureEqual,
	ensureIsTruthy,
	ensureIdsAreEqual,
	ensureArraysAreEqual,
} = require('../testUtil');

const {
	includeSetUpAndTearDown,
	generateRandomMongooseId,
	clearDb,
	createJob,
	createJobData,
	generateNMongooseIds,
} = require('../utils');

describe('Job', () => {
	includeSetUpAndTearDown();
	describe('Job', () => {
		let data;
		afterEach(async () => {
			await clearDb();
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			data = createJobData(
				generateRandomMongooseId(),
				generateRandomMongooseId(),
				[32, 32],
				'dog'
			);
			const doc = await Job.createOne(data);
			const props = ['vet_id', 'client_id', 'location', 'amount'];
			ensureObjectsHaveSameValuesForProps(props, doc, data);
			ensureArraysAreEqual(doc.imageUrls, data.imageUrls);
		});

		describe('statics', () => {
			const trials = 50;
			const numberOfVetsOrClients = Math.ceil(trials / 5);

			let vetIds = [];
			let clientIds = [];
			beforeEach(async () => {
				vetIds = generateNMongooseIds(trials);
				clientIds = generateNMongooseIds(trials);
				for (let i = 0; i < trials; i++) {
					await createJob(
						vetIds[i % numberOfVetsOrClients],
						clientIds[i % numberOfVetsOrClients],
						[34, 23],
						'dog'
					);
				}
			});
			it('findAllForVetId', async () => {
				const docs = await Job.findAllForVetId(vetIds[0]);
				ensureEqual(docs.length, Math.ceil(trials / numberOfVetsOrClients));
			});
			it('findAllForClientId', async () => {
				const docs = await Job.findAllForClientId(clientIds[0]);
				ensureEqual(docs.length, Math.ceil(trials / numberOfVetsOrClients));
			});
		});
		describe('methods', () => {
			let doc;
			beforeEach(async () => {
				doc = await createJob(
					generateRandomMongooseId(),
					generateRandomMongooseId(),
					[20, 20],
					'dog'
				);
			});
			it('should set amount', async () => {
				const amount = 5000;
				await doc.setAmount(amount);
				ensureEqual(doc.amount, amount);
			});
			it('should mark a job as paid', async () => {
				await doc.markAsPaid();
				ensureIsTruthy(doc.isPaid);
			});
			it('should set vet_id for a job', async () => {
				const vet_id = generateRandomMongooseId();
				await doc.setVetId(vet_id);
				ensureIdsAreEqual(vet_id, doc.vet_id);
			});
		});
	});
});
