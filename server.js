const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_tracker"
});

// Query Test 1
connection.query("SELECT * FROM employee_tracker.department", (err, results) => {
    err ? console.log(err) : console.table(results)
});