// Requires express.js from package.json
const express = require('express');

// Requires the notes router for /notes
const notesRouter = require('./notes');

// variable for express
const app = express();

// express uses the notes router when /notes
app.use('/notes', notesRouter);

// exports our express variable
module.exports = app;