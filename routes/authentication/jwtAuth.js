const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../database");

const validInfo = require("../authentication/validInfo");
const authorize = require("../authentication/authorize");
const jwtGenerator = require("../../utils/jwtGenerator");

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3)",
      [name, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const user = await pool.query("SELET * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credentials!");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Password!");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json(jwtToken);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
