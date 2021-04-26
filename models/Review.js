const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Review = new Schema({
	job_id: {
		type: ObjectId,
		required: true,
		ref: 'Job',
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
});

const { statics, methods } = Review;
statics.createOne = async function (data) {
	return await this.create(data);
};
statics.findReviewByJobId = async function (job_id) {
	return await this.findOne({ job_id });
};

module.exports = mongoose.model('Review', Review);
