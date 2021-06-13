const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Suitable = new Schema({
	vet_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	job_id: {
		type: ObjectId,
		required: true,
		ref: 'Job',
	},
});

const { statics, methods } = Suitable;

statics.createOne = async function (data) {
	return await this.create(data);
};
statics.findAllForVetId = async function (vet_id) {
	return await this.find({ vet_id }).populate(
		'job_id',
		'imageUrls description speciality location time'
	);
};

module.exports = mongoose.model('Suitable', Suitable);
