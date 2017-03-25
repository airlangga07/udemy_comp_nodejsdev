var { User } = require("./../models/user")

// create middleware
var authenticate = (req, res, next) => {
  // fetch the token from x-auth
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      // this promise will terminate, and .catch below will catch the error.
      return Promise.reject();
    }

    // passing the data through req, so the req in the routes can use it.
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    // 401 auth required
    res.status(401).send();
  })
};

module.exports = { authenticate };