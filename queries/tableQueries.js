const createTablesQuery = (options) => {
  const { pattern, db } = options;
  const like = pattern ? ` LIKE '${pattern}%'` : "";
  const database = db ? ` IN SCHEMA ${db}` : "";
  return `SHOW TABLES${like}${database}`;
};

const customTablesTransform = (rows, options) => {
  const { pattern } = options;
  return rows
    .map((row) => row.name)
    .filter((name) =>
      pattern ? name.toLowerCase().startsWith(pattern.toLowerCase()) : true
    );
};

module.exports = {
  createTablesQuery,
  customTablesTransform,
};
