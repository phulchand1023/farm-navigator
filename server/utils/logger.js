const chalk = require("chalk");

// Simple logger utility
const logger = {
  info: (msg) => console.log(chalk.blue("[INFO]"), msg),
  success: (msg) => console.log(chalk.green("[SUCCESS]"), msg),
  warn: (msg) => console.warn(chalk.yellow("[WARN]"), msg),
  error: (msg) => console.error(chalk.red("[ERROR]"), msg),
};

module.exports = logger;
