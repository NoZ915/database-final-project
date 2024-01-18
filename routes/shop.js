const path = require('path');

const express = require('express');
const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

router.get('/', shopController.getIndex);
router.get('/fee-platform', shopController.getFeePlatform);
router.get('/service-type', shopController.getServiceType);

router.get('/all-bin', shopController.getBinProducts)
router.get('/all-bin/:productId', shopController.getBinProduct);

router.get('/all-share', shopController.getShareProducts)
router.get('/all-share/:productId', shopController.getShareProduct);

router.get('/all-feeIn', shopController.getFeeInProducts)
router.get('/all-feeIn/:productId', shopController.getFeeInProduct);

router.get('/all-feeOut', shopController.getFeeOutProducts)
router.get('/all-feeOut/:productId', shopController.getFeeOutProduct);

router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder);

router.post('/delet-product', isAuth, shopController.postDeletePostProduct);


module.exports = router;