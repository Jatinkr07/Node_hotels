const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuth = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Welcome");
});

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menuItem", menuItemRoutes);

app.listen(PORT, () => {
  console.log("Listening on port: 3000");
});
