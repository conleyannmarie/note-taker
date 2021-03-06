//router method 
const router = require('express').Router();
//import routes 
const { filterByQuery, findByTitle, createNewNote, validateNotes } = require('../../lib/notes');
const { notes } = require('../../data/notes');

//get routes
  router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

   //error message
   router.get('/notes/:id', (req, res) => {
    const result = findByTitle(req.params.id, notes);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//post
router.post('/notes', (req, res) => {
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

module.exports  = router;