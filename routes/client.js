const express = require('express');
const router = express.Router();
const { client } = require('../controllers');
const { animalImageUploader } = require('../utils');

const { postJob, reviewJob, pay, getAllJobs } = client;

router.post('/post-job', animalImageUploader, postJob);
router.post('/review-job', reviewJob);
router.post('/pay-job', pay);
router.get('/all-jobs', getAllJobs);

module.exports = router;
