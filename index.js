const { MONGO_URI, PORT } = require("./config/env");

const { connector } = require("./models/utils");

const app = require("./app");

connector(MONGO_URI)
  .then(() => {
    app.listen(PORT);
    console.log(
      "Connected to the database. Application running on port= ",
      PORT
    );
  })
  .catch((e) => {
    throw new Error(e);
  });
