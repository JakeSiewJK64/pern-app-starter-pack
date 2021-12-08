const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");
const path = require("path");
const PORT = process.env.PORT || 5000;

const indexRouter = require('./routes/index');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

app.use('/',indexRouter);

app.get('/api/customers', cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];
  res.json(customers);
});

app.get('/api/pokemon', cors(), async (req, res) => {
  try {
    const pokemon = await pool.query('SELECT * FROM A_POKEMON');
    res.json(pokemon.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

