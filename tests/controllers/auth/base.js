const request = require('supertest');

const { Client, Vet } = require('../../../models');

const { clearDb, startApp, createDocWithDataForType } = require('../../utils');
const PORT = 3420;

const data = {
	name: 'John Doe',
	email: 'johndoe@email.com',
	password: 'Pa55word??',
};

exports.authTest = function (type) {
	let app;

	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterAll(async () => {
		await closeApp();
	});

	afterEach(async () => {
		await clearDb();
	});
	describe(`postSignUp`, () => {
		const signUpUrl = `/auth/sign-up/${type}`;
		it('should sign up for valid data', async () => {
			const successMessage = 'Successfully signed up.';
			const res = await makePostRequest(signUpUrl, data);
			const status = 201;
			const field = 'message';
			ensureResHasStatusCodeAndFieldData(res, status, field, successMessage);
		});
		it('should return error if the user already exists in the database', async () => {
			//create the user in the database to simulate previous sign up.
			await createDocWithDataForType(type, data);
			const error = 'Email already exists.Please try another one.';
			const res = await makePostRequest(signUpUrl, data);
			const status = 401;
			const field = 'error';
			ensureResHasStatusCodeAndFieldData(res, status, field, error);
		});
	});
	describe('postLogin', () => {
		const loginUrl = `/auth/log-in/${type}`;
		beforeAll(async () => {
			//to simulate sign up .
			await createDocWithDataForType(type, data);
		});
		afterAll(async () => {
			await clearDb();
		});
		it('should login for correct data', async () => {
			const res = await makePostRequest(loginUrl, data);
			ensureResHasStatusCodeAndProp(res, 201, 'token');
			const token = res.body.token;
			expect(token.length).toBeGreaterThan(40);
			//ensure that the token has bearer in front.
			const bearer = token.slice(0, 6);
			expect(bearer).toBe('Bearer');
		});
		it('should return error if email is incorrect', async () => {
			const invalid = {
				email: 'someemail@email.com',
				password: data.password,
			};
			const error = 'Invalid Email or Password';
			const res = await makePostRequest(loginUrl, invalid);
			ensureResHasStatusCodeAndFieldData(res, 404, 'error', error);
		});

		it('should return error if password is incorrect', async () => {
			const invalid = {
				email: data.email,
				password: '5omePa55word?',
			};
			const error = 'Invalid Email or Password';
			const res = await makePostRequest(loginUrl, invalid);
			ensureResHasStatusCodeAndFieldData(res, 404, 'error', error);
		});
	});
	async function makePostRequest(url, body) {
		return await request(app).post(url).send(body);
	}
};

function ensureResHasStatusCodeAndFieldData(res, statusCode, field, value) {
	expect(res.status).toBe(statusCode);
	expect(res.body).toHaveProperty(field, value);
}
function ensureResHasStatusCodeAndProp(res, statusCode, prop) {
	expect(res.status).toBe(statusCode);
	expect(res.body).toHaveProperty(prop);
}
