const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authentication/jwtAuth");
const logger = require("./utils/logger");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("client/build"));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/api", require("./routes/index"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  logger.log({
    level: "info",
    message: `Server is starting on port ${PORT}`,
  });
});
