//client is representative all the auth schemas hence represent a good test sample.
const { Client } = require('../../models');
const {
	ensureObjectsHaveSameValuesForProps,
	ensureEqual,
	ensureNull,
	ensureIsTruthy,
} = require('../testUtil');
const {
	includeSetUpAndTearDown,
	clearModel,
	confirmPassword,
	hashPassword,
} = require('../utils');

const MAX_SETUP_TIME_IN_MS = 20000;

describe.skip('Auth', () => {
	includeSetUpAndTearDown();
	describe('createOne', () => {
		afterEach(async () => {
			await clearModel(Client);
		});
		it('should create new user with password hashed', async () => {
			const name = 'John Doe';
			const email = 'test@email.com';
			const password = 'Pa55Word??';
			const data = {
				name,
				email,
				password,
			};
			const doc = await Client.createOne(data);
			const props = ['email', 'name'];
			ensureObjectsHaveSameValuesForProps(props, doc, data);
			//confirmPassword will ONLY return true if the second arguement is the hash of the
			//the first one. It will return false even when given  two same plain passwords.
			//As such it can be used to show that the password is hashed indeed.
			await expect(
				confirmPassword(password, doc.password)
			).resolves.toBeTruthy();
		});
	});
	describe('findByEmail', () => {
		const N = 2000;
		it('returns null on empty db', async () => {
			await clearModel(Client);
			await ensureReturnsNullOnUndefinedNullNonStringOrEmptyString();
			await ensureReturnsNullOnNonExistentEmail();
		});
		describe(`when db has ${N} docs`, () => {
			let emails;
			beforeAll(async () => {
				emails = createNEmails(N);
				await createDocsWithEmails(emails);
			}, MAX_SETUP_TIME_IN_MS);
			afterAll(async () => {
				await clearModel(Client);
			});
			it('return null for value other than strings or empty string.', async () => {
				await ensureReturnsNullOnUndefinedNullNonStringOrEmptyString();
			});
			it('first email', async () => {
				const firstEmail = emails[0];
				const firstDoc = await Client.findByEmail(firstEmail);
				ensureEqual(firstDoc.email, firstEmail);
			});
			it('last email', async () => {
				const lastEmail = emails[N - 1];
				const lastDoc = await Client.findByEmail(lastEmail);
				ensureEqual(lastDoc.email, lastEmail);
			});
			it('returns null on non-existing', async () => {
				await ensureReturnsNullOnNonExistentEmail();
			});
		});
		async function ensureReturnsNullOnNonExistentEmail() {
			const nonExistentEmail = 'random@email.com';
			ensureNull(await Client.findByEmail(nonExistentEmail));
		}
		async function ensureReturnsNullOnUndefinedNullNonStringOrEmptyString() {
			let undefined,
				nullValue = null,
				nonSting = 1234,
				empty = '';
			for (const invalid of [undefined, nullValue, nonSting, empty]) {
				ensureNull(await Client.findByEmail(invalid));
			}
		}
		async function createDocsWithEmails(emails) {
			//use the same password for all the emails. using different passwords will be time consuming
			//since each password must be hashed before being stored in the database.
			const commonHash = await hashPassword('Password45');
			for (const email of emails) {
				await docCreator('John Doe', commonHash, email);
			}
		}
	});
	describe('findOneWithCredentials', () => {
		//create 20 test docs since password
		//hashing takes time.
		const N = 20;
		it('returns null on empty db', async () => {
			await clearModel(Client);
			const email = 'example@email.com',
				password = 'password13';

			await Client.findOneWithCredentials(email, password);
			await ensureReturnsNullWhenEitherFieldsIsUndefinedNullNonStringOrEmptyString();
		});
		it('return null for value other than strings or empty string.', async () => {
			await ensureReturnsNullWhenEitherFieldsIsUndefinedNullNonStringOrEmptyString();
		});
		describe(`when db has ${N} docs`, () => {
			let emails, passwords;
			beforeAll(async () => {
				emails = createNEmails(N);
				passwords = createNPasswords(N);
				await createDocsWithCredentials(emails, passwords);
			}, MAX_SETUP_TIME_IN_MS);
			afterAll(async () => {
				await clearModel(Client);
			});

			it('first email and first password', async () => {
				const firstEmail = emails[0];
				const firstPassword = passwords[0];

				const firstDoc = await Client.findOneWithCredentials(
					firstEmail,
					firstPassword
				);
				ensureEqual(firstDoc.email, firstEmail);
				ensureIsTruthy(await confirmPassword(firstPassword, firstDoc.password));
			});
			it('last email and last password', async () => {
				const lastEmail = emails[N - 1];
				const lastPassword = passwords[N - 1];
				const lastDoc = await Client.findOneWithCredentials(
					lastEmail,
					lastPassword
				);
				ensureEqual(lastDoc.email, lastEmail);
				ensureIsTruthy(await confirmPassword(lastPassword, lastDoc.password));
			});
			it("returns null if both email and password don't match", async () => {
				const firstEmail = emails[0];
				const secondPassword = passwords[1];
				ensureNull(
					await Client.findOneWithCredentials(firstEmail, secondPassword)
				);
			});
		});
		async function ensureReturnsNullWhenEitherFieldsIsUndefinedNullNonStringOrEmptyString() {
			const email = 'example@email.com';
			const password = 'pa55word??';
			let undefined,
				nullValue = null,
				nonSting = 1234,
				empty = '';
			for (const invalid of [undefined, nullValue, nonSting, empty]) {
				//when email is invalid.
				await expect(
					Client.findOneWithCredentials(invalid, password)
				).resolves.toBeNull();
				//when password is invalid.
				await expect(
					Client.findOneWithCredentials(email, invalid)
				).resolves.toBeNull();
				//when both are invalid
				await expect(
					Client.findOneWithCredentials(invalid, invalid)
				).resolves.toBeNull();
			}
		}
	});
});

function createNEmails(N) {
	const emails = [];
	let email;
	for (let i = 0; i < N; i++) {
		email = `jdoe${i}@email${i}.com`;
		emails.push(email);
	}
	return emails;
}

function createNPasswords(N) {
	const passwords = [];
	let password;
	for (let i = 0; i < N; i++) {
		password = `${i}2password${i}@??`;
		passwords.push(password);
	}
	return passwords;
}
async function createDocsWithCredentials(emails, passwords) {
	const noOfEmails = emails.length;
	for (let i = 0; i < noOfEmails; i++) {
		const hash = await hashPassword(passwords[i]);
		await docCreator('John Doe', hash, emails[i]);
	}
}

async function docCreator(name, password, email) {
	let doc = new Client({
		name,
		password,
		email,
	});
	return await doc.save();
}
