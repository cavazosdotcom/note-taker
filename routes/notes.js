const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// 
notes.get('/', (req, res) => {

    // SEND THE FILE `notes.html`
    res.json( /* send note data */ `${req.method} request received to get notes`);

    console.log(`${req.method} request received to get notes`)
});

// 
notes.post('/', (req, res) => {

    const { title, text } = req.body;
    
    if ( title && text ) {
        const newNote = {
            title,
            text
        }
        
        // notes.push( newNote );
        
        // const notesString = JSON.stringify( notes );
        
        // fs.writeFile(`./db/db.json`, notesString, (err) => 
        // err 
        // ? console.error(err)
        // : console.log(
        //     `New Note has been written to JSON file`
        //     )
        //     );
            
        //     const response = {
        //         status: 'success',
        //         body: newNote,
        //     };
            
        //     console.log(response);
        //     res.status(201).json(response);
        // } else {
        //     res.status(500).json('Error in posting review');
        // }

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully!');
    } else { 
        res.error("Error in adding note")
    };


    // Access the note data that was sent
    // Create (persist) data
    // Access the new note data from 'req'
    // Push it to my existing list of notes
    // Write my updated notes list to the `db.json` file


    // res.json(`${req.method} request received to add to notes`);
    // console.log(`${req.method} request received to add to notes`)
});

module.exports = notes;