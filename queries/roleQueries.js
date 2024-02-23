const createRolesQuery = (options) => {
  return `SHOW GRANTS TO USER "${options.username.toUpperCase()}";`;
};

const customRolesTransform = (rows, options) => {
  const { pattern } = options;
  return rows
    .map((row) => row.role)
    .filter((role) =>
      pattern ? role.toLowerCase().startsWith(pattern.toLowerCase()) : true
    );
};

module.exports = {
  createRolesQuery,
  customRolesTransform,
};
