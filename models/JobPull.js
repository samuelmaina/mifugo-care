const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const JobPull = new Schema({
	vet_id: {
		type: ObjectId,
		required: true,
		unique: true,
	},
	jobIds: [
		{
			type: Object,
			ref: 'Job',
		},
	],
});
const { statics, methods } = JobPull;

statics.createOne = async function (data) {
	return await this.create(data);
};
statics.findOneForVetId = async function (vet_id) {
	return await this.findOne({ vet_id });
};

methods.addJobIdToPull = async function (id) {
	this.jobIds.push(id);
	return await this.save();
};

methods.removeJobIdFromPull = async function (id) {
	const jobs = this.jobIds;

	const updatedJobs = jobs.filter(job => {
		return job.toString() !== id.toString();
	});
	this.jobIds = updatedJobs;
	return await this.save();
};

module.exports = mongoose.model('JobPull', JobPull);
