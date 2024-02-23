const {
  fetchDataEndpoint,
  fetchQueryDataEndpoint,
} = require("../utils/fetchDataEndpoint");
const {
  createRolesQuery,
  customRolesTransform,
} = require("../queries/roleQueries");
const {
  createDatabaseQuery,
  customDatabaseTransform,
} = require("../queries/databaseQueries");
const {
  createWareHouseQuery,
  customWareHouseTransform,
} = require("../queries/wareHouseQueries");
const {
  createSchemaQuery,
  customSchemaTransform,
} = require("../queries/schemaQueries");
const {
  createTablesQuery,
  customTablesTransform,
} = require("../queries/tableQueries");

const getRoles = fetchDataEndpoint(createRolesQuery, customRolesTransform);
const getDatabases = fetchDataEndpoint(
  createDatabaseQuery,
  customDatabaseTransform
);
const getWarehouses = fetchDataEndpoint(
  createWareHouseQuery,
  customWareHouseTransform
);
const getSchemas = fetchDataEndpoint(createSchemaQuery, customSchemaTransform);
const getTables = fetchDataEndpoint(createTablesQuery, customTablesTransform);
const getQueryData = fetchQueryDataEndpoint;

module.exports = {
  getRoles,
  getDatabases,
  getWarehouses,
  getSchemas,
  getTables,
  getQueryData,
};
