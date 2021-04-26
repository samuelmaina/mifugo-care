const bodyParser = require('body-parser');

const { urlencoded, json } = bodyParser;
module.exports = app => {
	const conf = urlencoded({
		extended: false,
		limit: '50MB',
	});
	app.use(conf);
	app.use(json());
};
