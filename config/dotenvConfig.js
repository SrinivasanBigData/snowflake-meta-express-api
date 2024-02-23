const dotenv = require("dotenv");
const dotenvResult = dotenv.config();

if (dotenvResult.error) {
  console.log("Error Loading .env file", dotenvResult.error);
  throw dotenvResult.error;
}

module.exports = process.env;
