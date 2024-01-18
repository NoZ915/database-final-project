module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    // return res.redirect("/login");
    req.flash("error", "請先登入或註冊");
        // return res.redirect("/login");
        return req.session.save(err => {
          res.redirect('/login');
        });
  }
  next();
}