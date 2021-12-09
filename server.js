const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");
const path = require("path");
const PORT = process.env.PORT || 5000;

const indexRouter = require('./routes/index');
const authRouter = require('./routes/authentication/jwtAuth');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

app.use('/',indexRouter);
app.use('/authentication', authRouter);
app.use('/api', require('./routes/index'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

