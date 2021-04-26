const request = require('supertest');

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

describe.skip('Vet', () => {
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
		const url = '/client/post-job';
		token = 'Bearer abkljrklejklejrkljeklrejjrklejr';
		const res2 = await makePostRequest(url, {});
		expect(res2.status).toBe(401);
	});

	describe('when logged in ', () => {
		beforeEach(async () => {
			const type = 'client';
			const doc = await createDocWithDataForType(type, data);
			const loginUrl = `/auth/log-in/${type}`;
			const res = await request(app).post(loginUrl).send(data);
			token = res.body.token;
		});
		it.only('should create post new job', async () => {
			const url = '/vet/post-job';
			const details = {};

			const res = await makePostRequest(url, details);
			ensureResHasStatusCodeAndFieldData(
				res,
				201,
				'message',
				'Job Posted successfully'
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

					linkedInUrl: '/linkedIn/username1/newLinkedIn',
					speciality: ['sheep', 'cows', 'goats'],
				};

				const res = await makePostRequest(url, details);
				ensureResHasStatusCodeAndFieldData(
					res,
					201,
					'message',
					'Details updated successfully.'
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
