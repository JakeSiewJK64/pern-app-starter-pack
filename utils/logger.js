const winston = require("winston");
const myCustomColor = {
  levels: {
    info: 0,
    warn: 1,
    silly: 2,
    error: 3
  },
  colors: {
    info: "blue",
    warn: "red",
    silly: "pink",
    error: 'red'
  },
};

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[WINSTON LOGGER] ${timestamp} [${level}] ${message}`;
});

var winston_logger = winston.createLogger({
  levels: myCustomColor.levels,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
});

module.exports = winston_logger;
