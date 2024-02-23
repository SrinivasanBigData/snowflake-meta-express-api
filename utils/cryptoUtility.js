const crypto = require("crypto");
const {
  CRYPTO_ALOGORITHM,
  CRYPTO_PASSWORD,
} = require("../config/dotenvConfig");

const encryptionKey = Buffer.from(CRYPTO_PASSWORD.padEnd(32, "\0"), "utf-8");
const algorithm = CRYPTO_ALOGORITHM;

function encryptData(data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  );
  let encryptedData = cipher.update(JSON.stringify(data), "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return { encrypted_Data: encryptedData, iv: iv.toString("hex") };
}

function decryptData(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    Buffer.from(iv, "hex")
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return JSON.parse(decryptedData);
}

module.exports = { encryptData, decryptData };
