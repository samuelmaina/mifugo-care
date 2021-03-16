const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Job = new Schema({
	vet_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	user_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	location: {
		type: Object,
		required: true,
	},
});

const { statics, methods } = Job;

statics.addDetails = async function (data) {
	return await this.create(data);
};

module.exports = mongoose.model('Jobs', Job);
