const express = require("express");
const {
  getRoles,
  getDatabases,
  getWarehouses,
  getSchemas,
  getTables,
  getQueryData,
} = require("../controller/fetchDataController");
const router = express.Router();

router.post("/roles", getRoles);
router.post("/databases", getDatabases);
router.post("/warehouses", getWarehouses);
router.post("/schemas", getSchemas);
router.post("/tables", getTables);
router.post("/query", getQueryData);

module.exports = router;
