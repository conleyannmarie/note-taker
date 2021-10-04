const express = require('express');
//route to request data
const { notes } = require('./db/notes');
//instantiate the server with express
const app = express();

//filter function
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.) {
      filteredResults = filteredResults.filter(notes => notes. === notes.);
    }
    if (query.) {
      filteredResults = filteredResults.filter(notes => notes. === query.);
    }
    if (query.) {
      filteredResults = filteredResults.filter(notes => notes. === notes.;
    }
    return filteredResults;
  }

//get route
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

//listen method
app.listen(3002, () => {
    console.log(`API server now on port 3002!`);
  });