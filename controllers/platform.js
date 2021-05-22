const { Job } = require('../models');

const { Responder } = require('../utils');

exports.assignJobToVet = async (req, res, next) => {
	const responder = new Responder(res);
	const { body, file } = req;
	const imageUrl = file.path;
	body.imageUrl = imageUrl;
	await Job.createOne(body);
	responder.withStatusCode(201).withMessage('Job posted successfully.').send();
};

exports.reviewJob = async (req, res, next) => {
	const responder = new Responder(res);

	const { body } = req;
	const job_id = body.job_id;

	await findJobByIdAndReturnErrorMessageIfDoesNotExist(job_id, responder);
	await Review.createOne(body);
	responder
		.withStatusCode(201)
		.withMessage('Review added successfully.')
		.send();
};

exports.pay = async (req, res, next) => {
	const responder = new Responder(res);
	const { body } = req;
	const { job_id, amount } = body;

	const job = await findJobByIdAndReturnErrorMessageIfDoesNotExist(
		job_id,
		responder
	);

	const jobAmount = job.amount;
	if (jobAmount < amount) {
		return responder
			.withStatusCode(406)
			.withMessage('Paid less than the job amount>Please add')
			.send();
	} else if (jobAmount > amount)
		return responder
			.withStatusCode(406)
			.withMessage('Paid excess amount.')
			.send();
	else responder.withStatusCode(201).withMessage('Payment successful.').send();
};

async function findJobByIdAndReturnErrorMessageIfDoesNotExist(
	job_id,
	responder
) {
	const job = await Job.findById(job_id);
	if (!job) {
		responder.withStatusCode(401).withMessage('job does not exist').send();
		return null;
	}

	return job;
}
