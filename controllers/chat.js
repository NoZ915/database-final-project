const Product = require('../models/product');
const Order = require('../models/order');

exports.getChat = (req, res, next) => {
    res.render('/chat');
}

