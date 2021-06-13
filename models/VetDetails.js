const mongoose = require('mongoose');
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const VetDetails = new Schema({
	personal_details_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	experience: {
		type: String,
		required: true,
	},
	location: {
		type: Object,
		required: true,
	},

	linkedInUrl: {
		type: String,
		required: false,
	},
	speciality: {
		type: Array,
		required: true,
	},
});

const { statics, methods } = VetDetails;

statics.addDetails = async function (data) {
	const details = { ...data };
	details.personal_details_id = data.id;
	return await this.create(details);
};
statics.findByVetId = async function (vet_id) {
	return await this.findOne({ personal_details_id: vet_id });
};
statics.findAllForSpeciality = async function (speciality) {
	return await this.find({ speciality });
};

methods.getVetId = function () {
	return this.personal_details_id;
};

methods.editDetails = async function (details) {
	for (const field in details) {
		await this.editField(field, details[field]);
	}
};
methods.editField = async function (field, data) {
	this[field] = data;
	return await this.save();
};

module.exports = mongoose.model('VetDetails', VetDetails);
