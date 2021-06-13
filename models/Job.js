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
		maxlength: 200,
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
		required: true,
		minlength: 2,
		maxlength: 30,
	},
	description: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 200,
	},
	imageUrls: {
		type: Array,
		required: true,
	},
	time: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
		default: 'pending',
	},
});

const { statics, methods } = Job;

statics.createOne = async function (data) {
	const imageUrls = [];
	const files = data.files;
	for (const file of files) {
		imageUrls.push(file.path);
	}
	data.imageUrls = imageUrls;
	const doc = await this.create(data);
	return doc;
};
statics.findAllForVetId = async function (vet_id) {
	return await this.find({ vet_id });
};

statics.findAllForClientId = async function (client_id) {
	return await this.find({ client_id });
};

methods.setAmount = async function (amount) {
	this.amount = amount;
	return await this.save();
};
methods.setVetId = async function (vet_id) {
	this.vet_id = vet_id;
	return await this.save();
};

methods.setStatus = async function (status) {
	this.status = status;
	return await this.save();
};

methods.markAsPaid = async function () {
	this.isPaid = true;
	return this.save();
};

module.exports = mongoose.model('Job', Job);
