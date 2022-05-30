const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_tracker"
});

// View All Departments
connection.query(`SELECT * FROM employee_tracker.department`, (err, results) => {
    err ? console.log(err) : console.table(results)
});
// View All Roles
connection.query(`
SELECT role.id, role.title, department.name AS department, role.salary
FROM employee_tracker.role
INNER JOIN employee_tracker.department ON role.department_id = department.id;
`, (err, results) => {
    err ? console.log(err) : console.table(results)
});