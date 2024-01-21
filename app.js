const path = require('path');

const express = require('express');
var cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');

const User = require('./models/user');

require('dotenv').config();
console.log(require('dotenv').config())
// const MONGODB_URI = "mongodb+srv://noz915:noz915@cluster0.1btczck.mongodb.net/shop?retryWrites=true";


const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const orderRouter = require('./routes/order');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.ORIGIN]
  })
);
app.use(express.static(path.join(__dirname, '/public'))); //可以使用靜態檔
app.use(bodyParser.urlencoded({ extended: false })); //可以使用body物件
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(flash());

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
app.use(orderRouter);

// mongoose.connect(process.env.MONGODB_URI)
//   .then(result => {
//     app.listen(3001);
//   })
//   .catch(err => {
//     console.log(err);
//   });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => {
    app.listen(process.env.PORT || 3000, "0.0.0.0")
    console.log(`Connected the Database: "${x.connections[0].name}"`)
  })
  .catch(err => console.error('Error connecting to mongo', err));