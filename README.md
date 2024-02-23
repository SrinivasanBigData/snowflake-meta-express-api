# snowflake-meta-express-api

The `snowflake-meta-express-api` is likely a Node.js library designed to handle snowflake metadata operations within an Express.js API framework. this library for handling roles, databases, warehouses, schemas,tables and query Data in snowflake

## Installation

You can install `snowflake-meta-express-api` via npm:

```sh
npm install snowflake-meta-express-api
```

## Usage

```javascript
const express = require("express");
const snowflakeMeta = require("snowflake-meta-express-api");

const app = express();
app.use("/api", snowflakeMeta);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Query Parameters:

1. **page**: Page number (default: 1)
2. **pageSize**: Number of items per page (default: 10)
3. **pattern**: Search pattern (optional)
4. **db**: Search from database (optional)

## Common Connection Configration Payload

1. Simple Common Payload

   ```json
   {
     "connectionConfig": {
       "account": "",
       "username": "",
       "password": "",
       "port": 443
     }
   }
   ```

2. Encrypted Payload

   ```json
   {
     "connectionConfig": "f4ef3dbd2f636e4a0141bd2f",
     "iv": "4c048c295ea6a5a75ea97b3110f98887"
   }
   ```

## Features

- **Roles**: Enabled API endpoints to get the list of roles based on the logged-in user from Snowflake based on pagination with pattern search.
  - **API Endpoint**: `POST /api/snowflake/roles`
  - **Supported QueryParams**: `page,pageSize,pattern`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
- **Databases**: Enabled API endpoints to get the list of Databases from Snowflake based on pagination with pattern search.
  - **API Endpoint**: `POST /api/snowflake/databases`
  - **Supported QueryParams**: `page,pageSize,pattern`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
- **Warehouses**: Enabled API endpoints to get the list of warehouses from Snowflake based on pagination with pattern search.
  - **API Endpoint**: `POST /api/snowflake/warehouses`
  - **Supported QueryParams**: `page,pageSize,pattern`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
- **Schemas**: Enabled API endpoints to get the list of Schemas from Snowflake based on pagination with pattern search.
  - **API Endpoint**: `POST /api/snowflake/schemas`
  - **Supported QueryParams**: `page,pageSize,pattern,db`
  - **SampleDB Params**: `?db=<DatabaseName>`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
- **Tables**: Enabled API endpoints to get the list of Tables from Snowflake based on pagination with pattern search.
  - **API Endpoint**: `POST /api/snowflake/tables`
  - **Supported QueryParams**: `page,pageSize,pattern,db`
  - **SampleDB Params**: `?db=<DatabaseName>.<SCHEMA_NAME>`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
- **Data**: Enabled API endpoints to retrive data from Snowflake based on payload Query.
  - **API Endpoint**: `POST /api/snowflake/query`
  - **Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      },
      "query": "SELECT * FROM <DatabaseName>.<SCHEMA_NAME>.<TABLE_NAME> LIMIT 100"
    }
    ```
- **Encrypt**: Enabled API endpoints to Encrypt the payload Data
  - **API Endpoint**: `POST /api/crypto/encrypt`
  - **Sample Request Body**:
    ```json
    {
      "connectionConfig": {
        "account": "",
        "username": "",
        "password": "",
        "port": 443
      }
    }
    ```
    **Note**: Request Body can be any data format.

## Contributing

Thank you for considering contributing to `snowflake-meta-express-api` Contributions are welcome from everyone

## Issues

If you encounter any issues with the library, please feel free to open an issue on GitHub. Provide as much detail as possible, including code examples and error messages if applicable.
