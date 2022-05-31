// Import Dependencies
const mysql = require('mysql2');

// Create MySQL2 Connection
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_tracker"
});

module.exports = connection;