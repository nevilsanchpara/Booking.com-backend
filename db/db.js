const mongoose = require("mongoose");

const url =
  "mongodb+srv://nevilsaspara:Nevil%4015@cluster0.xekk7hn.mongodb.net/";

const connectToDatabase = async () => {
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = { connectToDatabase };
