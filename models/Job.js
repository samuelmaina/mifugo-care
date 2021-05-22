const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Job = new Schema({
	vet_id: {
		type: ObjectId,
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
		default: 0.0,
	},
	speciality: {
		type: String,
		minlength: 2,
		maxlength: 10,
	},
	description: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 200,
	},
	imageUrl: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 10,
	},
});

const { statics, methods } = Job;

statics.createOne = async function (data) {
	return await this.create(data);
};
statics.findAllForVetId = async function (vet_id) {
	return await this.find({ vet_id });
};
methods.setAmount = async function (amount) {
	this.amount = amount;
	return await this.save();
};
methods.setVetId = async function (vet_id) {
	this.vet_id = vet_id;
	return await this.save();
};

methods.markAsPaid = async function () {
	this.isPaid = true;
	return this.save();
};

module.exports = mongoose.model('Job', Job);
