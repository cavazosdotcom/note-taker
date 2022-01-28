const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const fs = require('fs');
const api = require('./routes/index.js');

// const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));


// 
app.get('/notes', (req, res) => {
    // SEND THE FILE `notes.html`
    res.sendFile( path.join(__dirname, 'public/notes.html' ) );
});





// 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);