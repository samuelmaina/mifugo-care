const { Responder } = require('../utils');

const { VetDetails, Job, JobPull } = require('../models');

exports.postAddDetails = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		//one can not change the logged in user object to vet.it is always called user.
		const { user, body } = req;
		const { id, name } = user;
		body.id = id;
		await VetDetails.addDetails(body);
		responder
			.withStatusCode(201)
			.withMessage(`Dear ${name}, Vet details added successfully.`);
		responder.send();
	} catch (error) {
		next(error);
	}
};

exports.postEditDetails = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { user, body } = req;
		const { id, name } = user;
		const message = `Dear ${name}, Vet details updated successfully.`;

		const details = await VetDetails.findByVetId(id);
		await details.editDetails(body);
		return responder.withStatusCode(201).withMessage(message).send();
	} catch (error) {
		next(error);
	}
};
exports.postAddToPull = async (req, res, next) => {
	try {
		const { body, user } = req;
		const { job_id } = body;
		const vet_id = user.id;
		const job = await Job.findById(job_id);
		await job.setVetId(vet_id);
		let pool = await JobPull.findOneForVetId(vet_id);
		if (!pool) {
			pool = await JobPull.createOne({ vet_id });
		}
		await pool.addJobIdToPull(job_id);

		const responder = new Responder(res);
		responder
			.withStatusCode(201)
			.withMessage('Job successfully added to pool.')
			.send();
	} catch (error) {
		next(error);
	}
};
exports.postRemoveFromPull = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { body, user } = req;
		const { job_id } = body;
		const vet_id = user.id;
		let pool = await JobPull.findOneForVetId(vet_id);
		await pool.removeJobIdFromPull(job_id);
		responder
			.withStatusCode(201)
			.withMessage('Job successfully removed from pool.')
			.send();
	} catch (error) {
		next(error);
	}
};
exports.setJobPrice = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { body } = req;
		const { job_id, amount } = body;
		const job = await Job.findById(job_id);
		await job.setAmount(amount);
		responder
			.withStatusCode(201)
			.withMessage('Job price set successfully.')
			.send();
	} catch (error) {
		next(error);
	}
};
exports.viewAllJobs = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		const { user } = req;
		const jobs = await Job.findAllForVetId(user.id);
		responder
			.withStatusCode(201)
			.withData({
				jobs,
			})
			.send();
	} catch (error) {
		next(error);
	}
};
