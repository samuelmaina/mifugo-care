const request = require('supertest');
const { Vet } = require('../../models');
const VetDetails = require('../../models/VetDetails');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
} = require('../utils');

const PORT = 3420;

const data = {
	name: 'John Doe',
	email: 'johndoe@email.com',
	password: 'Pa55word??',
};

describe('Vet', () => {
	let app;

	let token;

	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterEach(async () => {
		await clearDb();
	});
	afterAll(async () => {
		await closeApp();
	});
	it('should refuse when user not logged in', async () => {
		const url = '/vet/add-details';
		token = ' Bearer abkljrklejklejrkljeklrejjrklejr';
		const res2 = await makePostRequest(url, {});
		expect(res2.status).toBe(401);
	});

	describe('when logged in ', () => {
		let vet_id;
		const details = {
			experience: 5,
			location: { logitude: 3, latitude: 4 },

			linkedInUrl: '/linkedIn/username1/goodthing',
			speciality: ['cattle', 'cows', 'goats'],
		};
		beforeEach(async () => {
			const type = 'vet';
			const doc = await createDocWithDataForType(type, data);
			vet_id = doc.id;
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
				'Vet creation successful.'
			);
		});

		describe('after creation', () => {
			beforeEach(async () => {
				details.id = vet_id;
				await VetDetails.addDetails(details);
			});

			it.only('should editDetails For vet', async () => {
				const url = '/vet/edit-details';
				const details = {
					experience: 5,
					location: { logitude: 3, latitude: 4 },

					linkedInUrl: '/linkedIn/username1/newLinkedIn',
					speciality: ['sheep', 'cows', 'goats'],
				};

				const res = await makePostRequest(url, details);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					'Updated details successfullly.'
				);
				const vetData = await VetDetails.findOne({
					personal_details_id: vet_id,
				});
				expect(vetData.speciality).toContain('sheep');
				expect(vetData.linkedInUrl).toBe(details.linkedInUrl);
			});
		});
	});

	async function makePostRequest(url, body) {
		return await request(app).post(url).set('Authorization', token).send(body);
	}
});

function ensureResHasStatusCodeAndFieldData(res, statusCode, field, value) {
	expect(res.status).toBe(statusCode);
	expect(res.body).toHaveProperty(field, value);
}
