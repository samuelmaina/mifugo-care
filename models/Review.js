const mongoose = require('mongoose');
const { find } = require('./Auth');
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

statics.findAllForVetId = async function (vetId) {
	const reviews = await this.find().populate('job_id', 'vet_id');
	return filterForVetId(reviews, vetId);
};
const model = mongoose.model('Review', Review);

function filterForVetId(reviews, vetId) {
	const meetingCriterion = [];
	for (const review of reviews) {
		if (review.job_id.vet_id.toString() === vetId.toString())
			meetingCriterion.push(review);
	}
	return meetingCriterion;
}
module.exports = model;
