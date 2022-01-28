// requires express and creates notes router
const notes = require('express').Router();
// requires random id generator
const { v4: uuidv4 } = require('uuid');
// requires functions from fsUtils.js file
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils.js');

// GET request with /notes to read the data from db.json then promises to parse the data once retreived
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET request to load the note clicked on by it's id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });


// DELETE request to delete note based on it's id, then write the new data to the page
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);

        // Save that array to the filesystem
        writeToFile('./db/db.json', result);

        // Respond to the DELETE request
        res.json(`Note ${noteId} has been deleted 🗑️`);
        });
});


// POST request to create objects with newNote data and store them into the db.json file
notes.post('/', (req, res) => {

    const { title, text } = req.body;
    
    if ( title && text ) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        
        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else { 
        res.error("Error in adding note")
    };
});

// exports notes to be used in index.js
module.exports = notes;