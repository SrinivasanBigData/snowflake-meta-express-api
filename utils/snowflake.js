const snowflake = require("snowflake-sdk");

const createConnection = (connectionOptions) => {
  return snowflake.createConnection(connectionOptions);
};

const testConnection = (connection) => {
  return new Promise((resolve, reject) => {
    connection.connect((err, _) => {
      if (err) {
        console.error("Connection test failed: " + err.message);
        resolve({ success: false, error: err.message });
      } else {
        console.log("Connection test successful");
        resolve({ success: true });
      }
    });
  });
};

const destroyConnection = (connection) => {
  connection.destroy((err) => {
    if (err) {
      console.error("Error closing connection: " + err.message);
    } else {
      console.log("Connection closed");
    }
  });
};

const executeStatement = async (conn, sqlText) => {
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText: sqlText,
      complete: (err, stmt, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(stmt);
        }
      },
    });
  });
};

const fetchResult = async (conn, options, transformOptions) => {
  const pageSize = options.pageSize;
  const pageNumber = options.pageNumber;
  const offset = pageSize * (pageNumber - 1);
  const sqlText = `SELECT * FROM TABLE(RESULT_SCAN(LAST_QUERY_ID())) LIMIT ${pageSize} OFFSET ${offset}`;
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText: sqlText,
      complete: (err, stmt, rows) => {
        if (err) {
          reject(err);
        } else {
          if (options.transformFunction) {
            rows = options.transformFunction(rows, transformOptions);
          }
          resolve(rows);
        }
      },
    });
  });
};

const fetchDataFromSnowflake = async (
  connection,
  options,
  transformOptions
) => {
  try {
    const _ = await executeStatement(connection, options.sqlText);
    const result = await fetchResult(connection, options, transformOptions);
    return result;
  } catch (err) {
    console.error("Error executing SQL statement:", err.message);
    throw err;
  }
};

module.exports = {
  createConnection,
  testConnection,
  destroyConnection,
  fetchDataFromSnowflake,
};
