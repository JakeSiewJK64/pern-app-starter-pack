const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id) {
  const payload = {
    id: user_id,
  };
  return jwt.sign(payload, "secret", { expiresIn: "24h" });
};

module.exports = jwtGenerator;
