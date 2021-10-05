const router = require('express').Router();
const fs = require('fs');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
//const notesRoutes = require('../apiRoutes/noteRoutes');

router.get("/api/notes",(req,res) => {
    //get info about notes
    fs.readFile(path.join(__dirname, "../../db/db.json"),"utf8",(err,data) => {
        if (err) throw err;
        //send info
        res.json(JSON.parse(data));
    });
});

router.post("/api/notes",(req,res) => {

    const newNote = req.body;
    newNote.id = uuidv4()

    //get info about notes
    return fs.readFile(path.join(__dirname, "../../db/db.json"),"utf8",(err,data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);

        allNotes.push(newNote);

        fs.writeFile(path.join(__dirname, "../../db/db.json"),JSON.stringify(allNotes),"utf8", () => {
            //send info
            res.status(200).json({success: true});
        });

    });
});

router.delete("/api/notes/:id",(req,res) => {

    const id = req.params.id;

    //get info about notes
    return fs.readFile(path.join(__dirname, "../../db/db.json"),"utf8",(err,data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);

        const filteredNotes = allNotes.filter((note) => id !== note.id);
        
        fs.writeFile(path.join(__dirname, "../../db/db.json"),JSON.stringify(filteredNotes),"utf8", () => {
            //send info
            res.status(200).json({success: true});
        });

    });
});

module.exports = router;