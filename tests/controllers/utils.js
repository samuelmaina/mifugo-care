const { startApp, closeApp } = require('../utils');

const PORT = 3420;
exports.includeSetUpAndTeardown = () => {
	let app;
	beforeAll(async () => {
		app = await startApp(PORT);
	});
	afterAll(async () => {
		await closeApp();
	});
	console.log('did all the above.');
	console.log(app);
	return app;
};
