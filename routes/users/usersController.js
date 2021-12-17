const express = require("express");
const router = express.Router();
const authorization = require("../authentication/authorize");
const pool = require("../../db");
const logger = require("../../utils/logger");
const bcrypt = require("bcrypt");

router.get("/getAllUsers", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT u.user_id, u.user_name, u.user_email,u.first_name,u.last_name, encode(u.image_url, 'escape') AS image_url, r.role_name FROM users u LEFT JOIN roles r ON u.role = r.role_id;"
    );
    res.json(users.rows);
  } catch (error) {
    console.log(error.nessage);
    logger.error(error.message);
  }
});

router.post("/upsertUser", authorization, async (req, res) => {
  const {
    user_id,
    user_email,
    user_name,
    user_password,
    user_firstname,
    user_lastname,
    user_role,
    image_url,
  } = req.body;

  if (user_id === null) {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);
    const users = await pool.query(
      "INSERT INTO users(image_url, user_name, user_email, user_password, role, first_name, last_name) VALUES ($1,$2,$3,(SELECT role_id FROM roles WHERE role_name = $4),$5,$6)",
      [
        image_url,
        user_name,
        user_email,
        bcryptPassword,
        user_role,
        user_firstname,
        user_lastname,
      ]
    );
    return res.status(200).send({
      msg: users.rows[0],
    });
  }

  const userExists = await pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [req.body.user_id]
  );

  try {
    if (userExists.rows.length > 0) {
      const users = await pool.query(
        `UPDATE users SET
        user_name = $1,
        user_email = $2,
        role = (SELECT role_id FROM roles WHERE role_name = $3),
        first_name = $4,
        last_name = $5,
        image_url = $6
        WHERE user_id = $7
        `,
        [
          user_name,
          user_email,
          user_role,
          user_firstname,
          user_lastname,
          image_url,
          user_id,
        ]
      );
      return res.status(200).send({
        msg: users.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).send({
      msg: "Something happened :(",
      errorMsg: error,
    });
  }
});

module.exports = router;
