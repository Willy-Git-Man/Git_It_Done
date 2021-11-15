const AddEntriesFromIterable = require("es-abstract/2019/AddEntriesFromIterable");
const db = require("./db/models");
const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};
const logOutUser = (req, res) => {
  delete req.session.auth;
};

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect("/login");
  }
  next();
};

const userRestore = async (req, res, next) => {
  if (req.session.auth) {
    const { userId } = req.session.auth;
    try {
      const user = await db.User.findByPk(userId);
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (error) {
      res.locals.authenicated = false;
      next(error);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
  return;
};

module.exports = { loginUser, logOutUser, requireAuth, userRestore }
