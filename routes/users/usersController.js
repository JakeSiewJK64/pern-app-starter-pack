const express = require("express");
const router = express.Router();
const authorization = require("../authentication/authorize");
const pool = require("../../db");
const cors = require("cors");
const logger = require("../../utils/logger");

router.get("/getAllUsers", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT u.user_id, u.user_name, u.user_email,u.first_name,u.last_name, r.role_name FROM users u  LEFT JOIN roles r ON u.role = r.role_id;"
    );
    res.json(users.rows);
  } catch (error) {
    console.log(error.nessage);
    logger.error(error.message);
  }
});

router.post("/upsertUser", authorization, async (req, res) => {
  console.log(req.body);

  const {
    user_id,
    user_email,
    user_name,
    user_password,
    user_firstname,
    user_lastname,
    user_role,
  } = req.body;

  const userExists = await pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [user_id]
  );

  try {
    if (userExists.rows.length > 0) {
      const users = await pool.query(
        `UPDATE users SET
        user_name = $1,
        user_email = $2,
        role = (SELECT role_id FROM roles WHERE role_name = $3),
        first_name = $4,
        last_name = $5
        WHERE user_id = $6
        `,
        [
          user_name,
          user_email,
          user_role,
          user_firstname,
          user_lastname,
          user_id,
        ]
      );
      return res.status(200).send({
        msg: users.rows[0]
      });
    } else {
      const users = await pool.query(
        "INSERT INTO users(user_name, user_email, user_password, (SELECT role_id FROM roles WHERE role_id = $4), first_name, last_name) VALUES ($1,$2,$3,$5,$6)",
        [
          user_name,
          user_email,
          user_password,
          user_role,
          user_firstname,
          user_lastname,
        ]
      );
      return res.status(200).send({
        msg: users.rows[0]
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Something happened :("
    });
  }
});

module.exports = router;
