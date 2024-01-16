const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "首頁",
        path: "/",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getSystemType = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/system-type", {
        prods: products,
        pageTitle: "服務種類",
        path: "/system-type",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
}

//拆單商品
exports.getBinProducts = (req, res, next) => {
  Product.find({ service: "system-bin" })
    .then(products => {
      res.render("shop/all-bin", {
        prods: products,
        pageTitle: "拆單服務",
        path: "/all-bin",
        // isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getBinProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product)
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title
      })
    })
}

//團購商品
exports.getShareProducts = (req, res, next) => {
  Product.find({ service: "system-share" })
    .then(products => {
      res.render("shop/all-share", {
        prods: products,
        pageTitle: "團購服務"
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getShareProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(product)
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title
      })
    })
}