require("dotenv").config();
const ev = process.env;

const mongoose = require("mongoose");

const mongoDB = () => {
  mongoose
    .connect(ev.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("Database is connected ");
    })
    .catch((err) => console.log(err));
};
module.exports = mongoDB;
