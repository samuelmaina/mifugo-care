const express = require('express');
const router = express.Router();
const { vet } = require('../controllers');

router.post('/add-details', vet.postAddDetails);

module.exports = router;
