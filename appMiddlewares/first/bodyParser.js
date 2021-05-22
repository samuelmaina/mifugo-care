const express = require('express');

const { urlencoded, json } = express;
module.exports = app => {
	const conf = urlencoded({
		extended: false,
		limit: '50MB',
	});
	app.use(conf);
	app.use(json());
};
