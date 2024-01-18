const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  residence: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  post: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      _id: false
    }]
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      quantity: {
        type: Number,
        required: true
      },

      _id: false
    }]
  },
  favorites: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function (product, quantity) {
  const cartProductIndex = this.cart.items.findIndex(cartProduct => {
    return cartProduct.productId.toString() === product._id.toString();
  })

  let newQuantity = 0;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = Number(this.cart.items[cartProductIndex].quantity) + Number(quantity);
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: Number(newQuantity) + Number(quantity)
    })
  }

  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;

  return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  })
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.removeFromPost = function (productId) {
  const updatedPostItems = this.post.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  })
  this.post.items = updatedPostItems;
  return this.save();
}

userSchema.methods.clearCart = function () {
  this.cart = { items: [] }
  return this.save();
}

userSchema.methods.addToPost = function (product) {
  const updatedPostItems = [...this.post.items];
  updatedPostItems.push({
    productId: product._id
  })

  const updatedPost = { items: updatedPostItems };
  this.post = updatedPost;

  this.save();
}

module.exports = mongoose.model('User', userSchema);