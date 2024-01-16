const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  plateform: {
    type: String,
    required: false
  },
  targetAmount: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  targetQuantity: {
    type: Number,
    required: false
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // }
})

module.exports = mongoose.model('Product', productSchema);