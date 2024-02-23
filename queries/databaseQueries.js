const createDatabaseQuery = (options) => {
  const { pattern } = options;
  const like = pattern ? ` LIKE '${pattern}%'` : "";
  return `SHOW DATABASES${like}`;
};

const customDatabaseTransform = (rows, options) => {
  const { pattern } = options;
  return rows
    .map((row) => row.name)
    .filter((name) =>
      pattern ? name.toLowerCase().startsWith(pattern.toLowerCase()) : true
    );
};

module.exports = {
  createDatabaseQuery,
  customDatabaseTransform,
};
