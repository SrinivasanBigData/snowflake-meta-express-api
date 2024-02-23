const createWareHouseQuery = () => {
  return `SHOW WAREHOUSES`;
};

const customWareHouseTransform = (rows, options) => {
  const { pattern } = options;
  return rows
    .map((row) => row.name)
    .filter((name) =>
      pattern ? name.toLowerCase().startsWith(pattern.toLowerCase()) : true
    );
};

module.exports = {
  createWareHouseQuery,
  customWareHouseTransform,
};
