const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://noz915:noz915@cluster0.1btczck.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, '/public'))); //可以使用靜態檔
app.use(bodyParser.urlencoded({ extended: false })); //可以使用body物件

// app.use('/admin', adminRoutes);
app.use(adminRoutes);
app.use(shopRoutes);
// app.use(authRoutes);

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });