const { Responder } = require('../utils');

const { VetDetails, Job, JobPull, RecommendedJob } = require('../models');

// exports.postAddDetails = async (req, res, next) => {
//   try {
//     const responder = new Responder(res);
//     //one can not change the logged in user object to vet.it is always called user.
//     const { user, body } = req;
//     const { id, name } = user;
//     body.id = id;
//     await VetDetails.addDetails(body);
//     responder
//       .withStatusCode(201)
//       .withMessage(`Dear ${name}, Vet details added successfully.`);
//     responder.send();
//   } catch (error) {
//     next(error);
//   }
// };

exports.postEditDetails = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { user, body } = req;
    const { id, name } = user;

    const location = body.location;

    body.location = {
      latitude: location[0],
      longitude: location[1],
    };
    body.id = id;

    const message = `Dear ${name}, Vet details updated successfully.`;

    const details = await VetDetails.findByVetId(id);
    if (!details) {
      await VetDetails.addDetails(body);
      responder
        .withStatusCode(201)
        .withMessage(`Dear ${name}, Vet details added successfully.`);
    } else {
      await details.editDetails(body);
      responder.withStatusCode(201).withMessage(message);
    }
    return responder.send();
  } catch (error) {
    next(error);
  }
};

exports.getRecommendedJobs = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { user } = req;
    const { id, name } = user;
    const jobs = await RecommendedJob.findAllForVetId(id);
    responder
      .withStatusCode(201)
      .withData({
        jobs,
      })
      .send();
  } catch (error) {
    next(error);
  }
};
exports.getPull = async (req, res, next) => {
  const responder = new Responder(res);
  const { user } = req;
  const vet_id = user.id;
  let pool = await JobPull.findOneForVetId(vet_id);

  if (!pool) {
    pool = await JobPull.createOne({ vet_id });
    pool = await pool.pupulateJobDetails();
  }
  console.log(pool);
  let jobs = pool.job_ids;
  jobs = tranformJobs(jobs);
  return responder.withStatusCode(201).withData({ jobs }).send();
};

exports.postAddToPull = async (req, res, next) => {
  try {
    const status = 'allocated';
    const { body, user } = req;
    const { job_id } = body;
    const vet_id = user.id;

    let pool = await JobPull.findOneForVetId(vet_id);

    if (!pool) {
      pool = await JobPull.createOne({ vet_id });
    }
    await pool.addJobIdToPull(job_id);
    const job = await Job.findById(job_id);
    await job.setVetId(vet_id);
    await job.setStatus(status);
    await RecommendedJob.findOneAndDelete({ job_id });
    const responder = new Responder(res);
    responder
      .withStatusCode(201)
      .withMessage('Job successfully added to pool.')
      .send();
  } catch (error) {
    next(error);
  }
};
exports.postRemoveFromPull = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { body, user } = req;
    const { job_id } = body;
    const vet_id = user.id;
    let pool = await JobPull.findOneForVetId(vet_id);
    await pool.removeJobIdFromPull(job_id);
    responder
      .withStatusCode(201)
      .withMessage('Job successfully removed from pool.')
      .send();
  } catch (error) {
    next(error);
  }
};
exports.setJobPrice = async (req, res, next) => {
  try {
    const status = 'done';
    const responder = new Responder(res);
    const { body } = req;
    const { job_id, amount } = body;
    const job = await Job.findById(job_id);
    await job.setAmount(amount);
    await job.setStatus(status);
    responder
      .withStatusCode(201)
      .withMessage('Job price set successfully.')
      .send();
  } catch (error) {
    next(error);
  }
};
exports.viewAllJobs = async (req, res, next) => {
  try {
    const responder = new Responder(res);
    const { user } = req;
    let jobs = await Job.findAllForVetId(user.id);
    jobs = tranformJobs(jobs);
    responder
      .withStatusCode(201)
      .withData({
        jobs,
      })
      .send();
  } catch (error) {
    next(error);
  }
};

function tranformJobs(jobs) {
  let result = [];
  for (const job of jobs) {
    result.push({
      job_id: job,
    });
  }
  return result;
}
