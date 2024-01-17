const Product = require("../models/product");

exports.getSystemType = (req, res, next) => {
  res.render("admin/system-type", {
    pageTitle: "服務種類",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  })
}

exports.getSystemFee = (req, res, next) => {
  res.render("admin/system-fee", {
    pageTitle: "運費平攤",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  })
}

// system bin-上架拆單商品
exports.getSystemBin = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-bin", {
        prods: products,
        pageTitle: "拆單系統",
        path: "/system-bin",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postSystemBin = (req, res, next) => {
  const service = req.body.service;
  const imageUrl = req.body.imageUrl;
  const title = req.body.title;
  const website = req.body.website;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const price = req.body.price;
  const targetQuantity = req.body.targetQuatity;
  const userId = req.user._id;
  const product = new Product({
    service: service,
    imageUrl: imageUrl,
    title: title,
    website: website,
    description: description,
    deadline: deadline,
    price: price,
    targetQuantity: targetQuantity,
    userId: userId
  })
  product
    .save()
    .then(result => {
      console.log("Create System Bin Product");
      res.redirect("/all-bin");
    })
    .catch(err => {
      console.log(err);
    })
}

// system share-上架團購商品
exports.getSystemShare = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-share", {
        prods: products,
        pageTitle: "團購系統",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postSystemShare = (req, res, next) => {
  const service = req.body.service;
  const imageUrl = req.body.imageUrl;
  const title = req.body.title;
  const website = req.body.website;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const price = req.body.price;
  const targetQuantity = req.body.targetQuatity;
  const userId = req.user._id;
  const product = new Product({
    service: service,
    imageUrl: imageUrl,
    title: title,
    website: website,
    description: description,
    deadline: deadline,
    price: price,
    targetQuantity: targetQuantity,
    userId: userId
  })
  product
    .save()
    .then(result => {
      console.log("Create System Share Product");
      res.redirect("/all-share");
    })
    .catch(err => {
      console.log(err);
    })
}

// system feeIn-上架國內運費商品
exports.getSystemfeeIn = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-feeIn", {
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

exports.postSystemfeeIn = (req, res, next) => {
  const service = req.body.service;
  const platform = req.body.platform[0];
  const title = req.body.title;
  const website = req.body.website;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const targetAmount = req.body.targetAmount;
  const userId = req.user._id;
  const product = new Product({
    service: service,
    platform: platform,
    title: title,
    website: website,
    description: description,
    deadline: deadline,
    targetAmount: targetAmount,
    userId: userId
  })
  product
    .save()
    .then(result => {
      console.log("Create System feeIn Product");
      res.redirect("/all-feeIn");
    })
    .catch(err => {
      console.log(err);
    })
}

// system feeOut-上架海外運費商品
exports.getSystemfeeOut = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-feeOut", {
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

exports.postSystemfeeOut = (req, res, next) => {
  const service = req.body.service;
  const platform = req.body.platform[0];
  const title = req.body.title;
  const website = req.body.website;
  const description = req.body.description;
  const deadline = req.body.deadline;
  const targetAmount = req.body.targetAmount;
  const userId = req.user._id;
  const product = new Product({
    service: service,
    platform: platform,
    title: title,
    website: website,
    description: description,
    deadline: deadline,
    targetAmount: targetAmount,
    userId: userId
  })
  product
    .save()
    .then(result => {
      console.log("Create System feeOut Product");
      res.redirect("/all-feeOut");
    })
    .catch(err => {
      console.log(err);
    })
}