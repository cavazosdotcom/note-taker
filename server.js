const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// 
app.get('/notes', (req, res) => {
    // SEND THE FILE `notes.html`
    // res.sendFile(path.join(__dirname, '/notes.html'));
    res.sendFile( path.join(__dirname, 'public/notes.html' ) );
});


// 
app.get('/api/notes', (req, res) => {

    // SEND THE FILE `notes.html`
    res.json( /* send note data */ `${req.method} request received to get notes`);

    console.log(`${req.method} request received to get notes`)
});

// 
app.post('/api/notes', (req, res) => {

    // Access the note data that was sent
    const { title, text } = req.body;

    if ( title && text ) {
        // Create (persist) data
        const newNote = {
            title,
            text
        }

        notes.push( newNote );

        const notesString = JSON.stringify( notes );

        fs.writeFile(`./db/db.json`, notesString, (err) => 
            err 
                ? console.error(err)
                : console.log(
                    `New Note has been written to JSON file`
                )
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
        } else {
            res.status(500).json('Error in posting review');
        }
    // Access the new note data from 'req'

    // Push it to my existing list of notes

    // Write my updated notes list to the `db.json` file
    // res.json(`${req.method} request received to add to notes`);
    // console.log(`${req.method} request received to add to notes`)
});


// 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);