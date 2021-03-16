const { authTest } = require('./base');

describe('Auth controller', () => {
	describe('Client', () => {
		authTest('client');
	});
	describe('Vet', () => {
		authTest('vet');
	});
});
