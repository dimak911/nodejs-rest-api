const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      console.log("user: ", user);
      console.log("err: ", err);
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
