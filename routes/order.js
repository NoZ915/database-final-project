const path = require("path");

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.get('/order/:productId', orderController.getOrderProduct);

module.exports = router;