const express = require("express");
const { encryptHandler } = require("../controller/cryptoController");
const router = express.Router();

router.post("/encrypt", encryptHandler);

module.exports = router;
