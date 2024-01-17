const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

router.get('/system-type', adminController.getSystemType);
router.get('/system-fee', adminController.getSystemFee);

router.get('/system-bin', adminController.getSystemBin);
router.post('/system-bin', adminController.postSystemBin);

router.get('/system-share', adminController.getSystemShare);
router.post('/system-share', adminController.postSystemShare);

router.get('/system-feeIn', adminController.getSystemfeeIn);
router.post('/system-feeIn', adminController.postSystemfeeIn);

router.get('/system-feeOut', adminController.getSystemfeeOut);
router.post('/system-feeOut', adminController.postSystemfeeOut);

module.exports = router;