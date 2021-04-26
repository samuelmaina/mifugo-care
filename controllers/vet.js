const { Responder } = require('../utils');

const { VetDetails } = require('../models');

exports.postAddDetails = async (req, res, next) => {
	try {
		const responder = new Responder(res);
		//one can not change the logged in object to vet.it is always called user.
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
