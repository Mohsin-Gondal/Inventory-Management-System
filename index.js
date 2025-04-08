// Imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');


// Settings
require('dotenv').config();

// Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Routes
app.get('/home', (req, res) => {
    res.render('index');
});

//Server Listening
app.listen(port, () => { console.log('Server Listening on port', port) });