var express = require("express");
var router = express.Router();
var path = require("path");
var pool = require("../db");
var cors = require("cors");
var authorization = require("../routes/authentication/authorize");
const logger = require("../utils/logger");
app = express();
app.use(cors());

router.get("/", function (req, res, next) {
  res.render(path.join(__dirname, "../client/public", "index.html"));
});

router.get("/api", function (req, res, next) {
  res.send({ message: "Well Done" });
});

router.get("/api/customers", authorization, (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];
  res.json(customers);
});

router.get("/api/pokemon", authorization, async (req, res) => {
  try {
    const pokemon = await pool.query("SELECT * FROM A_POKEMON");
    res.json(pokemon.rows);
  } catch (err) {
    logger.log({
      level: "info",
      message: `${err.message}`,
    });
  }
});

module.exports = router;
