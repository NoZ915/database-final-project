const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getUserPage = (req, res, next) => {
  req.user
    .populate("post.items.productId")
    .then(user => {
      return Order.find({ 'user.userId': req.user._id });
    })
    .then(orders => {
      res.render("user/user", {
        pageTitle: "使用者頁面",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        prods: req.user.post.items,
        orders: orders
      })
    })
    .catch(err => {
      console.log(err);
    })
}