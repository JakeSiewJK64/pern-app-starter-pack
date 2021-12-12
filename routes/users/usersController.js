const express = require("express");
const router = express.Router();
const authorization = require("../authentication/authorize");
const pool = require("../../db");
const cors = require("cors");
const logger = require("../../utils/logger");

router.get("/getAllUsers", authorization, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.log(error.nessage);
    logger.error(error.message);
  }
});

module.exports = router;
