const express = require("express");
const snowflakeRoutes = require("./routes/snowflakeRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");

const app = express();
const bodyParser = require("body-parser");
const validateAndDecryptPayload = require("./middleware/payloadValidator");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/snowflake", validateAndDecryptPayload, snowflakeRoutes);
app.use("/crypto", cryptoRoutes);
module.exports = app;

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
