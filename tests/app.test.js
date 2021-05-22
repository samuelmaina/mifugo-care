const request = require('supertest');

const PORT = 8080;

const { startApp, closeApp, clearDb } = require('./utils');
const { ensureResHasStatusCodeAndFieldData } = require('./controllers/utils');
describe.skip('App test', () => {
	let app;
	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterAll(async () => {
		await closeApp();
		await clearDb();
	});
	it('should return 404 and page not found when accessing invalid url', async () => {
		const invalid = '/user/go';
		const res = await request(app).get(invalid);
		ensureResHasStatusCodeAndFieldData(res, 404, 'message', 'Page not found');
	});
});
