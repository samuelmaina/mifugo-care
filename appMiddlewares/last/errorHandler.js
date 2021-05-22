const { Responder } = require('../../utils');

module.exports = app => {
	const eH = (error, req, res, next) => {
		const errMsg = 'Internal server error';
		console.error(error);
		const responder = new Responder(res);
		responder.withStatusCode(500).withMessage(errMsg).send();
	};
	app.use(eH);
};
