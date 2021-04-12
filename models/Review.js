const mongoose = require('mongoose');
const { Reviews } = require('.');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const Review = new Schema({
	vet_id: {
		type: ObjectId,
		required: true,
		ref: 'Vet',
	},
	reviews: [
		{
			job_id: {
				type: ObjectId,
				required: true,
				ref: 'Vet',
			},
			rating: {
				type: Number,
				required: true,
			},
			review: {
				type: Object,
				required: true,
			},
		},
	],
});

const { statics, methods } = Review;
statics.creatOne = async function (data) {
	return await this.create(data);
};
statics.findReviewsForJobId = async function (job_id) {
	return await this.find({ job_id });
};
methods.addRating = async function (rating) {
	this.rating = rating;
	return await this.save();
};
methods.addReview = async function (review) {
	this.reviews.push(review);
	return this.save();
};

module.exports = mongoose.model('Review', Review);
