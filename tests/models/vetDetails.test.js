const { VetDetails, Vet } = require('../../models');

const { includeSetUpAndTearDown, clearModel } = require('../utils');

const MAX_SETUP_TIME_IN_MS = 20000;

describe('Auth', () => {
	includeSetUpAndTearDown();
	describe('addDetails', () => {
		afterEach(async () => {
			await clearModel(VetDetails);
		});
		it('should create for a vet', async () => {
			// const personal_details_id yearsOfExperience
			// location: linkedInUrl:

			const doc = await VetDetails.createOne(data);
			expect(doc.email).toBe(email);
			expect(doc.name).toBe(name);

			//confirmPassword will ONLY return true if the second arguement is the hash of the
			//the first one. It will return false even when given  two same plain passwords.
			//As such it can be used to show that the password is hashed indeed.
			await expect(
				confirmPassword(password, doc.password)
			).resolves.toBeTruthy();
		});
	});
});
