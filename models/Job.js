const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Job = new Schema({
	vet_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	client_id: {
		type: ObjectId,
		required: true,
		ref: 'Client',
	},
	location: {
		type: Object,
		required: true,
	},
	isPaid: {
		type: Boolean,
	},
	amount: {
		type: Number,
		required: true,
	},
});

const { statics, methods } = Job;

statics.createOne = async function (data) {
	return await this.create(data);
};
statics.findAllForVetId = async function (vet_id) {
	return await this.find({ vet_id });
};

methods.markAsPaid = async function () {
	this.isPaid = true;
	return this.save();
};

module.exports = mongoose.model('Job', Job);
