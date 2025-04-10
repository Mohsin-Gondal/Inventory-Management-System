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

app.get('/partial/dashboard', (req, res) => {
    setTimeout(() => {
        console.log("Dashboard Component Sent by Server");
        res.render('components/dashboard-partial');
    }, 3000);
});
app.get('/partial/damaged', (req, res) => {
    console.log("Damaged Stock Component Sent by Server");
    res.render('components/damaged-partial');
});
app.get('/partial/expired', (req, res) => {
    console.log("Expired Stock Component Sent by Server");
    res.render('components/expired-partial');
});
app.get('/partial/low', (req, res) => {
    console.log("Low Stock Component Sent by Server");
    res.render('components/low-partial');
});
//Server Listening
app.listen(port, () => { console.log('Server Listening on port', port) });