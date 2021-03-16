const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VetDetails = new Schema({
    personal_details_id:{
		type: mongoose.Types.ObjectId;
		required:true,
		ref:'Vet',
	},
	yearsOfExperience: {
		type: String,
		required: true,
	},
	location: {
		type: Object,
		required: true,
	},

	linkedInUrl: {
		type: String,
		required: true,
	},
});

const { statics, methods } = VetDetails;
statics.addDetails = async function (data) {
	return await this.create(data);
};

module.exports = mongoose.model('VetDetails', VetDetails);
