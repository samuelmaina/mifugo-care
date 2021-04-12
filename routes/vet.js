const express = require('express');

const router = express.Router();
const { vet } = require('../controllers');

const { postAddDetails, postEditDetails } = vet;

router.post('/add-details', postAddDetails);
router.post('/edit-details', postEditDetails);

module.exports = router;
