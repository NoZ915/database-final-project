const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getOrderProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const products = Order.products;
  Order.find({ _id: prodId })
    .then(result => {
      res.render("order/order", {
        pageTitle: "商品訂單",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err)
    })
}