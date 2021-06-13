const { VetDetails, Vet } = require('../../models');

const {
	includeSetUpAndTearDown,
	clearDb,
	generateRandomMongooseId,
	createVetDetails,
} = require('../utils');

const {
	ensureIdsAreEqual,
	ensureEqual,
	ensureObjectsAreEqual,
	ensureArraysAreEqual,
	ensureArrayHasElement,
	ensureObjectsHaveSameValuesForProps,
} = require('../testUtil');

let vetIds = [
	generateRandomMongooseId(),
	generateRandomMongooseId(),
	generateRandomMongooseId(),
];
const dog = 'dog',
	cat = 'cat',
	cow = 'cow';
let specialities = [
	[dog, cat],
	[cow, cat],
	[dog, cow],
];
const locations = [
	[32, 34],
	[32, 42],
	[44, 33],
];

describe.skip('Vet Details', () => {
	includeSetUpAndTearDown();
	describe('addDetails', () => {
		let data;
		afterEach(async () => {
			await clearDb();
		});
		beforeAll(async () => {
			const location = [34, 23];
			const specialities = ['speciality 1', 'speciality 2'];
			data = {
				id: generateRandomMongooseId(),
				linkedInUrl: 'https:/linkedIn/example',
				experience: 2,
				location,
				speciality: specialities,
			};
		});
		afterAll(async () => {
			await clearDb();
		});
		it('should create for a vet', async () => {
			const props = ['linkedInUrl', 'experience', 'location'];
			const doc = await VetDetails.addDetails(data);
			ensureObjectsHaveSameValuesForProps(props, doc, data);
			ensureArraysAreEqual(doc.speciality, data.speciality);
		});

		describe('After creation for a vet', () => {
			describe('Statics', () => {
				beforeEach(async () => {
					for (let index = 0; index < 3; index++) {
						await createVetDetails(
							vetIds[index],
							locations[index],
							specialities[index]
						);
					}
				});
				it('should find details according  to vet id', async () => {
					const firstId = vetIds[0];
					const found = await VetDetails.findByVetId(firstId);
					ensureIdsAreEqual(found.personal_details_id, firstId);
				});
			});
			describe('Methods', () => {
				let details;
				beforeEach(async () => {
					details = await createVetDetails(
						vetIds[0],
						locations[0],
						specialities[0]
					);
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
			});
		});
	});
});
