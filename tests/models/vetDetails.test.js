const { VetDetails, Vet } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearModel,
	createDocWithDataForType,
	clearDb,
} = require('../utils');

const {
	ensureIdsAreEqual,
	ensureEqual,
	ensureObjectsAreEqual,
	ensureArraysAreEqual,
	ensureArrayHasElement,
	ensureObjectsHaveSameValuesForProps,
} = require('../testUtil');

const MAX_SETUP_TIME_IN_MS = 20000;
const creds = {
	name: 'trial vet 1',
	email: 'example@email.com',
	password: ' Pa55word??>',
};

describe.skip('Vet Details', () => {
	includeSetUpAndTearDown();
	describe('addDetails', () => {
		let id;
		let data;
		afterEach(async () => {
			await clearModel(VetDetails);
		});
		beforeAll(async () => {
			id = (await createDocWithDataForType('vet', creds)).id;
			data = {
				id,
				linkedInUrl: 'https:/linkedIn/example',
				experience: 2,
				location: {
					county: 'County1',
					subCountry: 'sub county 1',
					location: 'location',
				},
				speciality: ['speciality 1', 'speciality 2'],
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('should create for a vet', async () => {
			const doc = await VetDetails.addDetails(data);
			const props = ['linkedInUrl', 'experience', 'location'];
			ensureObjectsHaveSameValuesForProps(props, doc, data);
			ensureArraysAreEqual(doc.speciality, data.speciality);
		});

		describe('After creation for a vet', () => {
			let details;
			beforeEach(async () => {
				details = await VetDetails.addDetails(data);
			});
			it('should editField', async () => {
				const newLinkedInUrl = 'linkedIn/23/3343/example';
				await details.editField('linkedInUrl', newLinkedInUrl);
				ensureEqual(details.linkedInUrl, newLinkedInUrl);
			});

			it('should editDetails', async () => {
				const newLinkedInUrl = 'linkedIn/23/3343/example';
				data.linkedInUrl = newLinkedInUrl;
				await details.editDetails(data);
				ensureEqual(details.linkedInUrl, newLinkedInUrl);
			});
			it('should find details according  to vet id', async () => {
				const found = await VetDetails.findByVetId(id);
				ensureIdsAreEqual(found.personal_details_id, id);
			});
		});
	});
});
