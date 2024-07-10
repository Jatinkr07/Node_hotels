const mongoose = require("mongoose");
//mongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";
//set up connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

//Listener
db.on("connected", () => {
  console.log("Connected to MongoDB server!");
});

db.on("error", (err) => {
  console.log("Error in MongoDB server!", err);
});

db.on("disconnected", () => {
  console.log("Disconnected to MongoDB server!");
});

module.exports = db;
