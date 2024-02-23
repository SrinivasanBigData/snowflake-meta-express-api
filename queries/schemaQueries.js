const createSchemaQuery = (options) => {
  const { pattern, db } = options;
  const like = pattern ? ` LIKE '${pattern}%'` : "";
  const database = db ? ` IN DATABASE "${db}"` : "";
  return `SHOW SCHEMAS${like}${database}`;
};

const customSchemaTransform = (rows, options) => {
  const { pattern } = options;
  return rows
    .map((row) => row.name)
    .filter((name) =>
      pattern ? name.toLowerCase().startsWith(pattern.toLowerCase()) : true
    );
};

module.exports = {
  createSchemaQuery,
  customSchemaTransform,
};
