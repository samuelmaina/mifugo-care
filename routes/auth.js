const express = require('express');
const router = express.Router();
const { auth } = require('../controllers');

router.post('/sign-up/:type', auth.postSignUp);
router.post('/log-in/:type', auth.postLogin);

module.exports = router;
