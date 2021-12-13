const express = require("express");
const router = express.Router();
const authorization = require("../authentication/authorize");
const pool = require("../../db");
const cors = require("cors");
const logger = require("../../utils/logger");
const { user } = require("pg/lib/defaults");

router.get("/getAllUsers", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT u.user_name, u.user_email,u.first_name,u.last_name, r.role_name FROM users u  LEFT JOIN roles r ON u.role = r.role_id;"
    );
    res.json(users.rows);
  } catch (error) {
    console.log(error.nessage);
    logger.error(error.message);
  }
});

router.post("/upsertUser", cors(), async (req, res) => {
  console.log(req.body);
  const {
    user_email,
    user_name,
    user_password,
    user_firstname,
    user_lastname,
    user_role,
  } = req.body;

  const userExists = await pool.query(
    "SELECT * FROM users WHERE user_email = $1",
    [user_email]
  );

  if (userExists.rows.length > 0) {
    const users = await pool.query(
      `UPDATE users SET
        user_name = $1,
        user_email = $2,
        user_password = $3,
        role = $4,
        first_name = $5,
        last_name = $6
        WHERE user_email = $7
        `,
      [
        user_name,
        user_email,
        user_password,
        user_role,
        user_firstname,
        user_lastname,
        user_email
      ]
    );
    res.json(users.rows[0]);
  } else {
    const users = await pool.query(
      "INSERT INTO users(user_name, user_email, user_password, role, first_name, last_name) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        user_name,
        user_email,
        user_password,
        user_role,
        user_firstname,
        user_lastname,
      ]
    );
    res.json(users.rows[0]);
  }
});

module.exports = router;
