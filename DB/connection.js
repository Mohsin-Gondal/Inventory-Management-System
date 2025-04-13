const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bp2592',
    database: 'inventory_ms'
});
connection.connect((err) => {
    if (err)
        console.log('Error Occured', err);
    console.log("Database Connection Succeed");

})
module.exports = connection;