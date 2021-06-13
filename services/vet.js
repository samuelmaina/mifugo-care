const radiusInKm = 6;
const GeoPoint = require('geopoint');

const { Vet, VetDetails, Review } = require('../models');
const predict = require('../utils/predictSpeciality');

exports.findSuitableVet = async (coOrdinates, speciality) => {
	const location = {
		latitude: coOrdinates[0],
		longitude: coOrdinates[1],
	};

	const species = predict(speciality);
	const vets = await VetDetails.findAllForSpeciality(species);
	const vetIdsWithin = this.getVetsWithinRange(vets, location);
	if (vetIdsWithin.length < 1) return null;
	return await this.getVetWithHighestRating(vetIdsWithin);
};

exports.getVetsWithinRange = (vetIdsAndTheirCoOrdinates, coOrdinates) => {
	const nearVets = [];

	for (const vetDetails of vetIdsAndTheirCoOrdinates) {
		if (
			this.calculateDistance(vetDetails.location, coOrdinates) <= radiusInKm
		) {
			nearVets.push(vetDetails.getVetId());
		}
	}
	return nearVets;
};
//the good thing that was there to those who do that and
//the ones who were there when the plane crushed. I
exports.getVetWithHighestRating = async vetIds => {
	//get all the reveiws for the each vets
	const vetAndTheirAvgRating = [];
	for (const id of vetIds) {
		const reviews = await Review.findAllForVetId(id);
		const avgRating = this.calculateTheAverageRating(reviews);
		vetAndTheirAvgRating.push({
			vet_id: id,
			rating: avgRating,
		});
	}
	return getVetWithMaxRating(vetAndTheirAvgRating);
};

exports.calculateTheAverageRating = reviews => {
	let sum = 0.0;
	for (const review of reviews) {
		sum += review.rating;
	}
	return Number((sum / reviews.length).toFixed(1));
};

function getVetWithMaxRating(vetRatings) {
	let indexOfMax = 0;
	let max = vetRatings[indexOfMax].rating;

	for (let i = 1; i < vetRatings.length; i++) {
		const rating = vetRatings[i].rating;
		if (rating > max) {
			max = rating;
			indexOfMax = i;
		}
	}
	return vetRatings[indexOfMax].vet_id;
}

exports.calculateDistance = function (start, end) {
	const startPoint = new GeoPoint(start.latitude, start.longitude);
	const endPoint = new GeoPoint(end.latitude, end.longitude);
	const inKilometers = true;
	return startPoint.distanceTo(endPoint, inKilometers);
};
