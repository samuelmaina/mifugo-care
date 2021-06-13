const request = require('supertest');
const {
	ensureValueGreaterThanOrEqual,
	ensureEqual,
} = require('../../testUtil');

const {
	clearDb,
	startApp,
	closeApp,
	createDocWithDataForType,
} = require('../../utils');
const {
	ensureResHasStatusCodeAndFieldData,
	ensureResHasStatusCodeAndProp,
} = require('../utils');

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
			const field2 = 'type';
			ensureResHasStatusCodeAndFieldData(res, status, field, successMessage);
			ensureResHasStatusCodeAndFieldData(res, status, field2, type);
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
		const url = `/auth/log-in/${type}`;
		beforeAll(async () => {
			//to simulate sign up.
			await createDocWithDataForType(type, data);
		});
		afterAll(async () => {
			await clearDb();
		});
		it('should login for correct data', async () => {
			const res = await makePostRequest(url, data);
			ensureResHasStatusCodeAndProp(res, 201, 'token');
			ensureResHasStatusCodeAndFieldData(res, 201, 'auth', type);
			const token = res.body.token;
			ensureValueGreaterThanOrEqual(token.length, 41);
			//ensure that the token has bearer in front.
			const bearer = token.slice(0, 6);
			ensureEqual(bearer, 'Bearer');
		});
		it('should return error if email is incorrect', async () => {
			const invalid = {
				email: 'someemail@email.com',
				password: data.password,
			};
			const error = 'Invalid Email or Password';
			const res = await makePostRequest(url, invalid);
			ensureResHasStatusCodeAndFieldData(res, 401, 'error', error);
		});

		it('should return error if password is incorrect', async () => {
			const invalid = {
				email: data.email,
				password: '5omePa55word?',
			};
			const error = 'Invalid Email or Password';
			const res = await makePostRequest(url, invalid);
			ensureResHasStatusCodeAndFieldData(res, 401, 'error', error);
		});
	});
	describe('postRest', () => {
		const url = `/auth/reset/${type}`;

		beforeAll(async () => {
			//to simulate sign up.
			await createDocWithDataForType(type, data);
		});
		afterAll(async () => {
			await clearDb();
		});
		it('should reset for correct data', async () => {
			//data will have the email field that is required for for sign
			const res = await makePostRequest(url, data);
			ensureResHasStatusCodeAndFieldData(
				res,
				201,
				'message',
				`Dear ${data.name}, a link has been sent to your email. Click on it to reset password.`
			);
		});
		it('should return error if email does not exist', async () => {
			const invalid = {
				email: 'someemail@email.com',
			};
			const error = 'The email does not exist.';
			const res = await makePostRequest(url, invalid);
			ensureResHasStatusCodeAndFieldData(res, 401, 'error', error);
		});
	});

	async function makePostRequest(url, body) {
		return await request(app).post(url).send(body);
	}
};
