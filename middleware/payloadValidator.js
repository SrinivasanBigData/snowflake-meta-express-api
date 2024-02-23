const { decryptData } = require("../utils/cryptoUtility");

const validateAndDecryptPayload = (req, res, next) => {
  if (!req.body || !req.body.connectionConfig) {
    return res
      .status(400)
      .json({ error: "connectionConfig is missing in the request body" });
  }
  const { connectionConfig, iv } = req.body;
  const decryptedPayload = iv
    ? decryptData(connectionConfig, iv)
    : connectionConfig;
  const { username, password, account, port } = decryptedPayload;
  const missingProperties = [];
  if (!username) missingProperties.push("username");
  if (!password) missingProperties.push("password");
  if (!account) missingProperties.push("account");
  if (!port) missingProperties.push("port");
  if (missingProperties.length > 0) {
    return res.status(400).json({
      error: `Payload is missing required properties:[ ${missingProperties.join(
        ", "
      )}]`,
    });
  }
  req.body.connectionConfig = decryptedPayload;
  next();
};

module.exports = validateAndDecryptPayload;
