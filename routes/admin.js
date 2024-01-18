const path = require('path');

const express = require('express');
const router = express.Router();

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

router.get('/system-type', adminController.getSystemType);
router.get('/system-fee', adminController.getSystemFee);

router.get('/system-bin', isAuth, adminController.getSystemBin);
router.post('/system-bin', isAuth, adminController.postSystemBin);

router.get('/system-share', isAuth, adminController.getSystemShare);
router.post('/system-share', isAuth, adminController.postSystemShare);

router.get('/system-feeIn', isAuth, adminController.getSystemfeeIn);
router.post('/system-feeIn', isAuth, adminController.postSystemfeeIn);

router.get('/system-feeOut', isAuth, adminController.getSystemfeeOut);
router.post('/system-feeOut', isAuth, adminController.postSystemfeeOut);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post('/edit-product/:productId', isAuth, adminController.postEditProduct);

module.exports = router;