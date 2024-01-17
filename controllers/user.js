const Product = require("../models/product");
const User = require("../models/user");

exports.getUserPage = (req, res, next) => {
  res.render("user/user", {
    pageTitle: "使用者頁面",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  })
}