const { getConnectionOptions } = require("../config/config");
const snowflake = require("./snowflake");
const SQLParser = require("sql-parser");

const fetchDataEndpoint =
  (createQuery, transformFunction = null) =>
  async (req, res) => {
    const { size, page, pattern, db } = req.query;
    const pageSize = parseInt(size) || 100;
    const pageNumber = parseInt(page) || 1;
    try {
      const connectionOptions = getConnectionOptions(req);
      const connection = snowflake.createConnection(connectionOptions);
      connection.connect(async (err, _) => {
        if (err) {
          console.error("Unable to connect: " + err.message);
          res
            .status(500)
            .json({ error: "Internal server error", errorMsg: err.message });
          return;
        }

        try {
          queryTransfomOptions = {
            username: connectionOptions.username,
            pattern: pattern,
            db: db,
          };
          const sqlText = createQuery(queryTransfomOptions);
          console.log(sqlText);

          const objects = await snowflake.fetchDataFromSnowflake(
            connection,
            {
              pageSize,
              pageNumber,
              sqlText,
              transformFunction,
            },
            queryTransfomOptions
          );

          const nextPageNumber = pageNumber + 1;
          let nextLink = null;
          if (objects.length > 0 && objects.length >= pageSize) {
            nextLink = `?size=${pageSize}&page=${nextPageNumber}&pattern=${
              pattern || ""
            }`;
          }
          const response = {
            objects: objects,
            metadata: {
              nextLink: nextLink,
            },
          };

          res.json(response);
        } catch (error) {
          console.error(`Error fetching`, error);
          res
            .status(500)
            .json({ error: "Internal server error", errorMsg: error.message });
        } finally {
          snowflake.destroyConnection(connection);
        }
      });
    } catch (error) {
      console.error("Error connecting to Snowflake:", error);
      res
        .status(500)
        .json({ error: "Internal server error", errorMsg: error.message });
    }
  };

const fetchQueryDataEndpoint = async (req, res) => {
  try {
    const query = req.body?.query;
    if (!query) {
      return res
        .status(400)
        .json({ error: "Bad Request", errorMsg: "Query is required" });
    }
    try {
      SQLParser.parse(query);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Bad Request", errorMsg: "Invalid SQL query" });
    }
    const connectionOptions = getConnectionOptions(req);
    const connection = snowflake.createConnection(connectionOptions);
    connection.connect(async (err, _) => {
      if (err) {
        console.error("Unable to connect: " + err.message);
        res
          .status(500)
          .json({ error: "Internal server error", errorMsg: err.message });
        return;
      }
      try {
        const objects = await fetchData(connection, query);
        const response = { objects: objects };
        res.json(response);
      } catch (error) {
        console.error(`Error fetching`, error);
        res
          .status(500)
          .json({ error: "Internal server error", errorMsg: error.message });
      } finally {
        snowflake.destroyConnection(connection);
      }
    });
  } catch (error) {
    console.error("Error connecting to Snowflake:", error);
    res
      .status(500)
      .json({ error: "Internal server error", errorMsg: error.message });
  }
};

const fetchData = async (connection, customQuery) => {
  return new Promise((resolve, reject) => {
    const queryStream = connection.execute({
      sqlText: customQuery,
      complete: (err, stmt, rows) => {
        if (err) {
          console.error("Error executing query: " + err.message);
          reject(err);
        } else {
          resolve(data);
        }
      },
    });
  });
};

module.exports = { fetchDataEndpoint, fetchQueryDataEndpoint };
