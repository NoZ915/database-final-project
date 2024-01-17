const path = require('path');

const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/user', userController.getUserPage);

module.exports = router;