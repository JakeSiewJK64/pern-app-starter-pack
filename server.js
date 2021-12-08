const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

const pool = require('./database');

app.listen(port, () => `Server running on port ${port}`);

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

