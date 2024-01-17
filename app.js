const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require('./models/user');

const MONGODB_URI = "mongodb+srv://noz915:noz915@cluster0.1btczck.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, '/public'))); //可以使用靜態檔
app.use(bodyParser.urlencoded({ extended: false })); //可以使用body物件
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    })
})

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(userRoutes);

mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });