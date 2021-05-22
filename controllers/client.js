const { Job, Review } = require('../models');

const { Responder } = require('../utils');

exports.postJob = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { body, file } = req;
		const imageUrl = file.path;
		body.imageUrl = imageUrl;
		await Job.createOne(body);
		responder
			.withStatusCode(201)
			.withMessage('Job posted successfully.')
			.send();
	} catch (error) {
		next(error);
	}
};

exports.reviewJob = async (req, res, next) => {
	try {
		const responder = new Responder(res);

		const { body } = req;
		const job_id = body.job_id;

		await findJobByIdAndReturnErrorMessageIfDoesNotExist(job_id, responder);
		await Review.createOne(body);
		responder
			.withStatusCode(201)
			.withMessage('Review added successfully.')
			.send();
	} catch (error) {
		next(error);
	}
};

exports.pay = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { body } = req;
		const { job_id, amount } = body;

		const job = await findJobByIdAndReturnErrorMessageIfDoesNotExist(
			job_id,
			responder
		);
		const jobAmount = job.amount;
		responder.withStatusCode(406);
		if (jobAmount < amount) {
			return responder
				.withMessage('Paid less than the job amount>Please add')
				.send();
		} else if (jobAmount > amount)
			return responder.withMessage('Paid excess amount.').send();
		else
			responder.withStatusCode(201).withMessage('Payment successful.').send();
	} catch (error) {
		next(error);
	}
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
