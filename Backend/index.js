var express = require("express");
var app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // Access for body for request

// ROUTES
const userrouter = require("./src/routes/userRoutes");
app.use(userrouter);

app.listen(3000, function () {
  console.log("Server started on port 3000...");
});