const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

exports.connectDatabase = async () => {
  try {
    const dbinfo = await mongoose.connect(
      "mongodb+srv://sabbir000921_db_user:GAXwKLcg1y61Yimo@clusterecommerce.cchlumx.mongodb.net/Exommerce" ||
        `${process.env.MONGODB_URL}/Ciclone`
    );
    console.log(
      chalk.yellow(`Database connection sucessfull ${dbinfo.connection.host}`)
    );
  } catch (error) {
    console.log(chalk.red("Database connection faield!!", error));
  }
};
