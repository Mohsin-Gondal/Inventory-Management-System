// Imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connection = require('./config/db');
// Settings
require('dotenv').config();

// Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Routes
app.get('/home', (req, res) => {
    sql = 'SELECT * FROM notifications';
    connection.query(sql, (err, result, field) => {
        if (err)
            console.log(err);
        // console.log(result);
        res.render('pages/index', { result, moment: require('moment') });
    });
});

app.get('/partial/dashboard', (req, res) => {
    let Data = {
        moment: require('moment'),
    }
    sql = 'SELECT * FROM products';
    connection.query(sql, (err, result, field) => {
        if (err)
            console.log(err);
        Data.products = result;
        connection.query('SELECT SUM(Quantity) AS TOTAL FROM products', (err, totalProducts_) => {
            if (err)
                console.log(err);
            Data.totalProducts = totalProducts_[0].TOTAL;


            console.log("Dashboard Component Sent by Server");
            res.render('components/dashboard-partial', Data);

        });
    });
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
app.get('/partial/new', (req, res) => {
    console.log("New Stock Component Sent by Server");
    res.render('components/new-partial');
});
//Server Listening
app.listen(port, () => { console.log('Server Listening on port', port) });