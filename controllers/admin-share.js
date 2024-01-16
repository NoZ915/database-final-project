const Product = require("../models/product");

// system share
exports.getSystemShare = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("admin/system-share", {
        prods: products,
        pageTitle: "團購系統"
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
      console.log("Create System Share Product");
      res.redirect("/all-share");
    })
    .catch(err => {
      console.log(err);
    })
}