var express = require("express");
var router = express.Router();
var path = require("path");
var cors = require("cors");
var authorization = require('../routes/authentication/authorize');

app = express();
app.use(cors());

router.get("/", function (req, res, next) {
  res.render(path.join(__dirname, "../client/public", "index.html"));
});

router.get("/api", function (req, res, next) {
  res.send({ message: "Well Done" });
});

app.get("/api/customers", cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];
  res.json(customers);
});

app.get("/api/pokemon", cors(), async (req, res) => {
  try {
    const pokemon = await pool.query("SELECT * FROM A_POKEMON");
    res.json(pokemon.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/userprofile", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.id,
    ]);
    console.log(user.rows);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
