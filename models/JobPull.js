const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ObjectId = Types.ObjectId;

const JobPull = new Schema({
  vet_id: {
    type: ObjectId,
    required: true,
    unique: true,
  },
  job_ids: [
    {
      type: ObjectId,
      ref: 'Job',
    },
  ],
});
const { statics, methods } = JobPull;

statics.createOne = async function (data) {
  return await this.create(data);
};
statics.findOneForVetId = async function (vet_id) {
  return await this.findOne({ vet_id }).populate(
    'job_ids',
    'imageUrls description speciality location time'
  );
};

methods.addJobIdToPull = async function (id) {
  this.job_ids.push(id);
  return await this.save();
};
methods.pupulateJobDetails = async function () {
  return await this.populate(
    'job_ids',
    'imageUrls description speciality location time'
  ).execPopulate();
};

methods.removeJobIdFromPull = async function (id) {
  const jobs = this.job_ids;

  const updatedJobs = jobs.filter((job) => {
    return job._id.toString() !== id.toString();
  });
  this.job_ids = updatedJobs;
  return await this.save();
};

module.exports = mongoose.model('JobPull', JobPull);
