require("dotenv").config();
const ev = process.env;

const express = require("express");
const mongoDB = require("./config/mongoDB");
const userRoute = require("./routes/userProfile");

const app = express();

//connect to database
mongoDB();

app.use(express.json());

// APIS
app.use("/auth", userRoute);

//ERROR 404
// app.use("*", (req, res) => {
//   return res.json({ message: "Unauthorized page Eror 404.." });
// });

app.listen(ev.PORT, () => {
  console.log("server is listening at " + ev.PORT);
});
