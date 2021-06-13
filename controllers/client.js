const { Job, Review, VetDetails, RecommendedJob } = require('../models');
const { vet } = require('../services');

const { Responder } = require('../utils');

exports.postJob = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { body, user, files } = req;
    body.files = files;
    body.client_id = user.id;
    const location = body.location;
    const delimeter = ',';
    const strings = location.split(delimeter);
    body.location = [Number(strings[0]), Number(strings[1])];
    const job = await Job.createOne(body);
    responder.withStatusCode(201).withMessage('Job posted successfully.');

    const { speciality } = body;

    const suitable = await vet.findSuitableVet(body.location, speciality);
    if (suitable)
      await RecommendedJob.createOne({
        vet_id: suitable,
        job_id: job.id,
      });
    else {
      responder
        .withStatusCode(304)
        .withMessage('Unable to assign a suitable vet.');
      await job.delete();
    }
    responder.send();
  } catch (error) {
    next(error);
  }
};

exports.reviewJob = async (req, res, next) => {
  try {
    const responder = new Responder(res);

    const { body } = req;
    const job_id = body.job_id;

    await findJobByIdAndReturnErrorMessageIfDoesNotExist(job_id, responder);
    await Review.createOne(body);
    responder
      .withStatusCode(201)
      .withMessage('Review added successfully.')
      .send();
  } catch (error) {
    next(error);
  }
};

exports.pay = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { body } = req;
    const { job_id, amount } = body;

    const job = await findJobByIdAndReturnErrorMessageIfDoesNotExist(
      job_id,
      responder
    );
    const jobAmount = job.amount;
    responder.withStatusCode(406);
    if (jobAmount < amount) {
      return responder
        .withMessage('Paid less than the job amount>Please add')
        .send();
    } else if (jobAmount > amount)
      return responder.withMessage('Paid excess amount.').send();
    else
      responder.withStatusCode(201).withMessage('Payment successful.').send();
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  const responder = new Responder(res);
  const { user } = req;
  const { id } = user;
  const jobs = await Job.findAllForClientId(id);
  responder.withStatusCode(201).withData({ jobs }).send();
};

async function findJobByIdAndReturnErrorMessageIfDoesNotExist(
  job_id,
  responder
) {
  const job = await Job.findById(job_id);
  if (!job) {
    responder.withStatusCode(401).withMessage('job does not exist').send();
    return null;
  }

  return job;
}
