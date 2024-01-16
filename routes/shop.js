const path = require('path');

const express = require('express');
const router = express.Router();

const shopController = require("../controllers/shop");

router.get('/', shopController.getIndex);
router.get('/system-type', shopController.getSystemType);

router.get('/all-bin', shopController.getBinProducts)
router.get('/all-bin/:productId', shopController.getBinProduct);

router.get('/all-share', shopController.getShareProducts)
router.get('/all-share/:productId', shopController.getShareProduct);

module.exports = router;