require("dotenv").config();

const mongoose = require("mongoose");

exports.mongoConnect = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.on("error", () => {
    console.log("Error connection to database");
  });
  connection.once("open", () => {
    console.log("Connected to Database");
  });
};
