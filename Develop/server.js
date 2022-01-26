const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));


// 
app.get('/notes', (req, res) => {

    // SEND THE FILE `notes.html`
    // res.sendFile(path.join(__dirname, 'notes.html'));
    res.sendFile();
});


// 
app.get('/api/notes', (req, res) => {

    // SEND THE FILE `notes.html`
    res.json( /* send note data */);

});

app.post('/api/notes', (req, res) => {

    // Create (persist) data

    // Access the new note data from 'req'

    // Push it to my existing list of notes

    // Write my updated notes list to the `db.json` file
    
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);