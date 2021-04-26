const routes = require('./routes');
module.exports = app => {
	const { auth, vet } = routes;
	app.use('/auth', auth);
	app.use('/vet', vet);
};
