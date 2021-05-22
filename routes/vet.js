const express = require('express');

const router = express.Router();
const { vet } = require('../controllers');

const {
	postAddDetails,
	postEditDetails,
	postAddToPull,
	postRemoveFromPull,
	setJobPrice,
	viewAllJobs,
} = vet;

router.post('/add-details', postAddDetails);
router.post('/edit-details', postEditDetails);
router.post('/add-to-pull', postAddToPull);
router.post('/remove-from-pull', postRemoveFromPull);
router.post('/set-job-price', setJobPrice);
router.get('/view-all-jobs', viewAllJobs);

module.exports = router;
