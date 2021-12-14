const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");

const validInfo = require("./validInfo");
const authorize = require("./authorize");
const jwtGenerator = require("../../utils/jwtGenerator");
const logger = require("../../utils/logger");

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

    var newuser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    const jwtToken = jwtGenerator(newuser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    logger.log({
      level: "info",
      message: `${error.message}`,
    });
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Either your email or password is incorrect!");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Password!");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (error) {
    logger.log({
      level: "info",
      message: `${error.message}`,
    });
    res.status(500).send("Server Error!");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    logger.log({
      level: "info",
      message: `${error.message}`,
    });
    res.status(500).send("Server Error!");
  }
});

router.get("/userprofile", authorize, async (req, res) => {
  try {
    const user = await pool.query("SELECT user_name, (SELECT role_name FROM roles WHERE role_id = role) FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    logger.log({
      level: "info",
      message: `${error.message}`,
    });
  }
});

module.exports = router;
