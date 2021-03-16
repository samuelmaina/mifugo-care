const { Vet } = require('../models');

exports.postAddDetails = async (req, res, next) => {
	try {
		const data = req.body;
		await Vet.createOne(data);
		res.status(201).json({
			message: 'Vet creation successful.',
		});
	} catch (error) {
		res.status(500).json({
			error: 'Unable to create vet',
		});
	}
};
