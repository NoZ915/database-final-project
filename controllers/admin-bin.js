const Product = require("../models/product");

// system bin
exports.getSystemBin = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-bin", {
        prods: products,
        pageTitle: "拆單系統",
        path: "/system-bin",
        // isAuthenticated: req.session.isLoggedIn
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
  const product = new Product({
    service: service,
    imageUrl: imageUrl,
    title: title,
    website: website,
    description: description,
    deadline: deadline,
    price: price,
    targetQuantity: targetQuantity
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