// import required modules
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Create a new express application
const app = express();

//  use the middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Import the v1 router
const v1Router = require("./src/v1/index").router;

// import the connection function
const connection = require("./src/v1/config/connection/connection");

// Connect to the database
connection();

// Use the v1 router
app.use("/api/v1", v1Router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
