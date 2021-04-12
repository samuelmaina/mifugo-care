const { VetDetails } = require('../models');

exports.postAddDetails = async (req, res, next) => {
	try {
		const { user, body } = req;
		const data = { ...body };

		const id = user.id;
		data.id = id;

		await VetDetails.addDetails(data);
		res.status(201).json({
			message: 'Vet creation successful.',
		});
	} catch (error) {
		next(error);
	}
};

exports.postEditDetails = async (req, res, next) => {
	try {
		const { user, body } = req;
		const data = { ...body };
		const id = user.id;
		data.id = id;

		const details = await VetDetails.findOne({ personal_details_id: id });
		await details.editDetails(data);
		res.status(201).json({
			message: 'Updated details successfullly.',
		});
	} catch (error) {
		next(error);
	}
};
