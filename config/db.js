const path = require('path');
const mysql = require('mysql2');
let main = async () => {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bp2592',
        database: 'inventory_ms'
    });
};
main().then(() => {
    console.log("DB Connected");
}).catch((er) => {
    console.log("Error Connecting DB");
    console.log(er);
});
module.exports = connection;
