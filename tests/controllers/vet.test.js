const request = require('supertest');
const { vet } = require('../../controllers');
const { VetDetails } = require('../../models');
const {
	ensureEqual,
	ensureObjectsHaveSameValuesForProps,
	ensureArrayHasElement,
} = require('../testUtil');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
} = require('../utils');

const { ensureResHasStatusCodeAndFieldData } = require('./utils');

const PORT = 3420;

const data = {
	name: 'John Doe',
	email: 'johndoe@email.com',
	password: 'Pa55word??',
};

describe('Vet', () => {
	let token;

	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterAll(async () => {
		await closeApp();
	});
	afterEach(async () => {
		await clearDb();
	});

	it('should refuse when user not logged in', async () => {
		const url = '/vet/add-details';
		token = 'Bearer abkljrklejklejrkljeklrejjrklejr';
		const res = await makePostRequest(url, {});
		ensureEqual(res.status, 401);
	});

	describe('when logged in ', () => {
		let vet_id;
		let name;
		const details = {
			experience: 5,
			location: { logitude: 3, latitude: 4 },
			linkedInUrl: '/linkedIn/username1/newLinkedIn',
			speciality: ['cats', 'cows', 'goats'],
		};
		beforeEach(async () => {
			const type = 'vet';
			const doc = await createDocWithDataForType(type, data);
			vet_id = doc.id;
			name = doc.name;
			const loginUrl = `/auth/log-in/${type}`;
			const res = await request(app).post(loginUrl).send(data);
			token = res.body.token;
		});
		it('should create new vet', async () => {
			const url = '/vet/add-details';

			const res = await makePostRequest(url, details);
			ensureResHasStatusCodeAndFieldData(
				res,
				201,
				'message',
				`Dear ${name}, Vet details added successfully.`
			);
		});

		describe('after creation', () => {
			beforeEach(async () => {
				details.id = vet_id;
				await VetDetails.addDetails(details);
			});

			it('should editDetails For vet', async () => {
				const url = '/vet/edit-details';
				const details = {
					experience: 5,
					location: { logitude: 3, latitude: 4 },

					linkedInUrl: '/linkedIn/username3455/newLinkedIn',
					speciality: ['sheep', 'cows', 'goats'],
				};

				const res = await makePostRequest(url, details);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					`Dear ${name}, Vet details updated successfully.`
				);
				const vetData = await VetDetails.findOne({
					personal_details_id: vet_id,
				});
				ensureArrayHasElement(vetData.speciality, 'sheep');
			});
		});
	});

	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
});
