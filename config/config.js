const getConnectionOptions = (req) => {
  const { connectionConfig } = req.body;
  const { username, password, account, port, warehouse, database, schema } =
    connectionConfig;

  return {
    username,
    password,
    account,
    warehouse,
    database,
    schema,
    port,
  };
};

module.exports = {
  getConnectionOptions,
};
