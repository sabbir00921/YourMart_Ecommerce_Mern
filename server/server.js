const { app } = require("./src/app");
const chalk = require("chalk");
const { connectDatabase } = require("./src/database/db");
require("dotenv").config();

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        chalk.green(
          `Server running at http://localhost:${process.env.PORT || 5000}`
        )
      );
    });
  })
  .catch((error) => {
    console.log(chalk.red("Database connection faield!!", error));
  });
