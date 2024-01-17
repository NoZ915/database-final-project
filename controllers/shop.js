const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "首頁",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  });
}

exports.getFeePlatform = (req, res, next) => {
  res.render("shop/fee-platform", {
    pageTitle: "運費平攤",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  })
}

exports.getServiceType = (req, res, next) => {
  res.render("shop/service-type", {
    pageTitle: "服務種類",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  })
}

//拆單商品
exports.getBinProducts = (req, res, next) => {
  Product.find({ service: "system-bin" })
    .then(products => {
      res.render("shop/all-bin", {
        prods: products,
        pageTitle: "拆單服務",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
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
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err);
    });
}

//團購商品
exports.getShareProducts = (req, res, next) => {
  Product.find({ service: "system-share" })
    .then(products => {
      res.render("shop/all-share", {
        prods: products,
        pageTitle: "團購服務",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
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
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err);
    });
}

//國內平台商品
exports.getFeeInProducts = (req, res, next) => {
  Product.find({ service: "system-feeIn" })
    .then(products => {
      res.render("shop/all-feeIn", {
        prods: products,
        pageTitle: "國內平台",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getFeeInProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail-fee", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err);
    });
}

//海外平台商品
exports.getFeeOutProducts = (req, res, next) => {
  Product.find({ service: "system-feeOut" })
    .then(products => {
      res.render("shop/all-feeOut", {
        prods: products,
        pageTitle: "海外平台",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getFeeOutProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail-fee", {
        product: product,
        pageTitle: product.title,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err);
    });
}

//購物車
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "我要併！",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const quantity = req.body.quantity;
  Product
    .findById(prodId)
    .then(product => {
      return req.user.addToCart(product, quantity);
    })
    .then(result => {
      res.redirect("/cart");
    })
}

//移除購物車
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}