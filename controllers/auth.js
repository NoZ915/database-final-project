const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "登入",
    user: req.user,
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: '註冊',
    isAuthenticated: req.session.isLoggedIn,
    user: req.user
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const nickname = req.body.nickname;
  const residence = req.body.residence;
  const avatar = req.body.avatar;

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const registrationDate = formattedDate;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        // req.flash("error", "email exist already");
        return res.redirect("/signup")
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            nickname: nickname,
            residence: residence,
            avatar: avatar,
            registrationDate: registrationDate,
            post: { items: [] },
            cart: { items: [] },
            favorites: { items: [] }
          })
          return user.save();
        })
    })
    .then(result => {
      res.redirect("/login");
    })
    .catch(err => {
      console.log(err)
    })
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // req.flash("error", "invalid email or password");
        // return res.redirect("/login");
        return req.session.save(err => {
          res.redirect('/login');
        });
      }
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            })
          }
          // req.flash("error", "invalid email or password");
          res.redirect("/login")
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
}