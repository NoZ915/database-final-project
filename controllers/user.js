const Product = require("../models/product");
const User = require("../models/user");

exports.getUserPage = (req, res, next) => {
  req.user
    .populate("post.items.productId")
    .then(user => {
      res.render("user/user", {
        pageTitle: "使用者頁面",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        prods: user.post.items
      })
    })
    .catch(err => {
      console.log(err);
    })
}