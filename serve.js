//node modules
const fs = require("fs");
const path = require("path");
const express = require("express");
//route to request data
const { notes } = require("./db/notes");
//set port
const PORT = process.env.PORT || 3002;
//instantiate the server with express
const app = express();
//routes variables
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

//listen method
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
