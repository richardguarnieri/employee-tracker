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

// View All Roles
connection.query(`
SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
FROM employee_tracker.employee AS employee1
LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
INNER JOIN employee_tracker.role ON employee1.role_id = role.id
INNER JOIN employee_tracker.department ON role.department_id = department.id;
`, (err, results) => {
    err ? console.log(err) : console.table(results)
});