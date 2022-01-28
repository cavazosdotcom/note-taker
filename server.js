// All of our requires
// express, path, custom clog, fs
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const fs = require('fs');
const api = require('./routes/index.js');

// Creates PORT for heroku then defaults to 3001
const PORT = process.env.PORT || 3001;

const app = express();

// custom middleware, clog
app.use(clog);

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));


// GET route for notes page
app.get('/notes', (req, res) => {
    // SEND THE FILE `notes.html`
    res.sendFile( path.join(__dirname, 'public/notes.html' ) );
});


// creates PORT link in terminal, starts applications server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);