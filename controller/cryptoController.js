const { encryptData } = require("../utils/cryptoUtility");

const encryptHandler = async (req, res) => {
  try {
    const data = req.body;
    const encryptedData = await encryptData(data);
    res.json(encryptedData);
  } catch (error) {
    console.error("Error encrypting data:", error);
    res.status(500).send("Error encrypting data.");
  }
};

module.exports = { encryptHandler };
