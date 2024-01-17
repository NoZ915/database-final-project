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
  const editMode = req.query.edit;
  Product.find()
    .then(products => {
      res.render("admin/system-bin", {
        prods: products,
        pageTitle: "拆單系統",
        path: "/system-bin",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        editing: editMode
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
  const targetQuantity = req.body.targetQuantity;
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
      return req.user.addToPost(product);
    })
    .catch(err => {
      console.log(err);
    })
}

// system share-上架團購商品
exports.getSystemShare = (req, res, next) => {
  const editMode = req.query.edit;
  Product.find()
    .then(products => {
      res.render("admin/system-share", {
        prods: products,
        pageTitle: "團購系統",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        editing: editMode
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
      return req.user.addToPost(product);
    })
    .catch(err => {
      console.log(err);
    })
}

// system feeIn-上架國內運費商品
exports.getSystemfeeIn = (req, res, next) => {
  const editMode = req.query.edit;
  Product.find()
    .then(products => {
      res.render("admin/system-feeIn", {
        prods: products,
        pageTitle: "國內平台",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        editing: editMode
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
      return req.user.addToPost(product);
    })
    .catch(err => {
      console.log(err);
    })
}

// system feeOut-上架海外運費商品
exports.getSystemfeeOut = (req, res, next) => {
  const editMode = req.query.edit;
  Product.find()
    .then(products => {
      res.render("admin/system-feeOut", {
        prods: products,
        pageTitle: "海外平台",
        isAuthenticated: req.session.isLoggedIn,
        user: req.user,
        editing: editMode
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
    .then(product => {
      console.log("Create System feeOut Product");
      res.redirect("/all-feeOut");
      return req.user.addToPost(product);
    })
    .catch(err => {
      console.log(err);
    })
}

//編輯商品
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render(`admin/system-${product.service}`, {
        pageTitle: "編輯商品",
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn,
        user: req.user
      })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postEditProduct = (req, res, next) => {
  console.log(req.user)
  const service = req.body.service;
  const prodId = req.params.productId;

  const updatedTitle = req.body.title;
  const updatedWebsite = req.body.website;
  const updatedDescription = req.body.description;
  const updatedDeadline = req.body.deadline;
  const updatedImageUrl = req.body.imageUrl ? req.body.imageUrl : "";
  const updatedTargetAmount = req.body.targetAmount ? req.body.targetAmount : "";
  const updatedTargetQuantity = req.body.targetQuantity ? req.body.targetQuantity : "";
  const updatedPrice = req.body.price ? req.body.price : "";
  const updatedPlatform = req.body.platform ? req.body.platform[0] : "";
  if (service === "bin" || service === "share") {
    Product.findByIdAndUpdate(
      prodId,
      {
        imageUrl: updatedImageUrl,
        title: updatedTitle,
        website: updatedWebsite,
        description: updatedDescription,
        deadline: updatedDeadline,
        price: updatedPrice,
        targetQuantity: updatedTargetQuantity,
      }
    )
      .then(result => {
        console.log("Updated bin's or share's Product")
        res.redirect(`/all-${service}`);
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    Product.findByIdAndUpdate(
      prodId,
      {
        title: updatedTitle,
        website: updatedWebsite,
        description: updatedDescription,
        deadline: updatedDeadline,
        platform: updatedPlatform,
        targetAmount: updatedTargetAmount,
      }
    )
      .then(result => {
        console.log("Updated fee's Product")
        res.redirect(`/all-${service}`);
      })
      .catch(err => {
        console.log(err);
      })
  }

}