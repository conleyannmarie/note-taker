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

//filter function
function filterByQuery(query, notesArray) {
    let titleArray = [];
    let filteredResults = notesArray;
    if (query.title {
      if (typeof query.title === 'string') {
        titleArray = [query.title];
      } else {
        titleArray = query.title;
      }
      titleArray.forEach(title => {
        filteredResults = filteredResults.filter(
          notes => notes.title.indexOf(title) !== -1
        );
      });
    }
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
  }
  
  //find id
  function findByTitle(title, notesArray) {
    const result = notesArray.filter(notes => notes.title === title)[0];
    return result;
  }

  function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  }

  function validateNotes(Notes) {
    if (!note.name || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }
  
  //get routes
  app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  //error message
  app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//post
app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateNotes(req.body)) {
    res.status(400).send('This note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/assets/index.html'));
});

//listen method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });