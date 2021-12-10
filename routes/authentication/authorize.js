const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  if (token) {
    try {
      const verify = jwt.verify(token, "secret");
      req.user = verify.id;
      next();
    } catch (err) {
      res.status(401).json({
        msg: "Token is not valid",
      });
    }
  } else {
    return res.status(403).json({ msg: "authorization denied!" });
  }
};
