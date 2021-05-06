const { Job, Review } = require('../models');

const { Responder } = require('../utils');

exports.postJob = async (req, res, next) => {
	const responder = new Responder(res);
	const { body } = req;
	const imageUrl = req.file.path;
	body.imageUrl = imageUrl;
	await Job.createOne(body);
	responder.withStatusCode(201).withMessage('Job posted successfully.').send();
};
exports.reviewJob = async (req, res, next) => {
	const responder = new Responder(res);

	const { body } = req;
	const job_id = body.job_id;

	const job = Job.findById(job_id);
	if (!job)
		return responder
			.withStatusCode(401)
			.withMessage('job does not exist')
			.send();
	await Review.createOne(body);
	responder
		.withStatusCode(201)
		.withMessage('Review added successfully.')
		.send();
};

exports.pay = async (req, res, next) => {};
