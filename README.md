# snowflake-meta-express-api

The `snowflake-meta-express-api` is likely a Node.js library designed to handle snowflake metadata operations within an Express.js API framework

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
