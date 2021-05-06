const express = require('express');

const router = express.Router();
const { client } = require('../controllers');

const { postJob, reviewJob } = client;

router.post('/post-job', postJob);
router.post('/review-job', reviewJob);
// router.post('/edit-details', postEditDetails);

module.exports = router;
