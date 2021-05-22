const { Responder } = require('../../utils');

module.exports = app => {
	const notFound = (req, res, next) => {
		try {
			const responder = new Responder(res);
			return responder.withStatusCode(404).withMessage('Page not found').send();
		} catch (error) {
			next(error);
		}
	};
	app.use(notFound);
};
