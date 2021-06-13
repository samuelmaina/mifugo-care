const { authTest } = require('./base');

describe.skip('Auth controller', () => {
	describe('Client', () => {
		authTest('client');
	});
	describe('Vet', () => {
		authTest('vet');
	});
});
