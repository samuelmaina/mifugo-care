const { Job } = require('../../models');
const { vet } = require('../../routes');
const { validIDs } = require('../testUtil');

const {
	includeSetUpAndTearDown,
	clearModel,
	createDocWithDataForType,
	clearDb,
} = require('../utils');

const MAX_SETUP_TIME_IN_MS = 20000;
const creds = {
	name: 'trial vet 1',
	email: 'example@email.com',
	password: ' Pa55word??>',
};

describe.skip('Job', () => {
	includeSetUpAndTearDown();
	describe('Job', () => {
		let vet_id;
		let client_id;
		let data;
		afterEach(async () => {
			await clearModel(Job);
		});
		beforeAll(async () => {
			vet_id = (await createDocWithDataForType('vet', creds)).id;
			client_id = (await createDocWithDataForType('client', creds)).id;
			data = {
				vet_id,
				client_id,
				location: {
					county: 'County1',
					subCountry: 'sub county 1',
					location: 'location',
				},
				amount: 1000,
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('createOne', async () => {
			const doc = await Job.createOne(data);
			validIDs(doc.vet_id, data.vet_id);
			validIDs(doc.client_id, data.client_id);
			expect(doc.location).toBe(data.location);
			expect(doc.amount).toBe(data.amount);
		});

		describe('statics', () => {
			it('findAllForVetId', async () => {
				await Job.createOne(data);
				await Job.createOne(data);
				await Job.createOne(data);

				const docs = await Job.findAllForVetId(data.vet_id);
				expect(docs.length).toBe(3);
			});
		});
		describe('methods', () => {
			let doc;
			beforeEach(async () => {
				doc = await Job.createOne(data);
			});
			it('should mark a job as paid', async () => {
				await doc.markAsPaid();
				expect(doc.isPaid).toBeTruthy();
			});
			it('should mark a job as paid', async () => {
				await doc.markAsPaid();
				expect(doc.isPaid).toBeTruthy();
			});
			it('should delete a job', async () => {
				const docId = doc.id;
				await doc.delete();
				expect(await Job.findById(docId)).toBeNull();
			});
		});
	});
});
