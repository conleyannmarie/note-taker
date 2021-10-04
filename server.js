const express = require('express');
//route to request data
const { animals } = require('./db/notes');
//instantiate the server with express
const app = express();

//get route
app.get('/api/notes', (req, res) => {
    res.send('Notes');
  });

//listen method
app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });