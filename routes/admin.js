const path = require('path');

const express = require('express');
const router = express.Router();

const adminBinController = require("../controllers/admin-bin");
const adminShareController = require("../controllers/admin-share");

router.get('/system-bin', adminBinController.getSystemBin);
router.post('/system-bin', adminBinController.postSystemBin);
router.get('/system-share', adminShareController.getSystemShare);
router.post('/system-share', adminShareController.postSystemShare);

module.exports = router;