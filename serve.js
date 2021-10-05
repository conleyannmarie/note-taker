//node modules
const fs = require('fs');
const path = require('path');
const express = require('express');
//route to request data
const { notes } = require('./db/notes');
//set port
const PORT = process.env.PORT || 3002;
//instantiate the server with express
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));
  

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/assets/index.html'));
});

//listen method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });