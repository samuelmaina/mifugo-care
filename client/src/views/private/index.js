const { vet } = require('./sysview2');
const { Reset } = require('./passreset');
const {
	Client,
	Ratings,
	Request,
	Details,
	Timeline,
	HistoryReview,
} = require('./sysview1');
const { VetForm } = require('./vetform/vetForm');

module.exports = {
	vet,
	Client,
	VetForm,
	Ratings,
	Request,
	Details,
	Timeline,
	HistoryReview,
	Reset,
};
