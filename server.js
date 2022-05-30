const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { setTimeout: setTimeoutPromise } = require('timers/promises');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_tracker"
});

// --- MySQL Queries ---
// View All Departments
const viewAllDepartments = async () => {
    const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.department`)
    console.log('\n--------------------------------------------------')
    console.log('              Showing All Departments             ')
    console.log('--------------------------------------------------')
    console.table(rows)
};

// View All Roles
const viewAllRoles = async () => {
    const [rows, fields] = await connection.promise().query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM employee_tracker.role
    INNER JOIN employee_tracker.department ON role.department_id = department.id;
    `)
    console.log('\n--------------------------------------------------')
    console.log('                Showing All Roles                 ')
    console.log('--------------------------------------------------')
    console.table(rows)
};

// View All Employees
const viewAllEmployees = async () => {
    const [rows, fields] = await connection.promise().query(`
    SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
    FROM employee_tracker.employee AS employee1
    LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
    INNER JOIN employee_tracker.role ON employee1.role_id = role.id
    INNER JOIN employee_tracker.department ON role.department_id = department.id;
    `)
    console.log('\n--------------------------------------------------')
    console.log('              Showing All Employees               ')
    console.log('--------------------------------------------------')
    console.table(rows)
};

// Add Department
const addDepartment = async () => {
    const result = await inquirer.prompt(
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?: ",
            validate: stringValidation
        }
    )
    const [rows, fields] = await connection.promise().query(`
    INSERT INTO employee_tracker.department (name)
    VALUES (?);
    `, result.departmentName)
    console.log(`\nDepartment "${result.departmentName}" has been added to the database! Great work!\n`)
};

const userChoices = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add Department',
    'Add Role',
    'Add Employee',
    'Update Employee Role',
    'Quit'
];

const stringValidation = (string) => {
    return (Number(string) || string.trim().length === 0) ? false : true
}

const welcomeFn = async () => {
    console.log(`
    ______                _                         _____              _             
    |  ___|              | |                       |_   _|            | |            
    | |__ _ __ ___  _ __ | | ___  _   _  ___  ___    | |_ __ __ _  ___| | _____ _ __ 
    |  __| '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   | | '__/ _' |/ __| |/ / _ \\ '__|
    | |__| | | | | | |_) | | (_) | |_| |  __/  __/   | | | | (_| | (__|   <  __/ |   
    \\____/_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|   \\_/_|  \\__,_|\\___|_|\\_\\___|_|   
                   | |             __/ |                                             
                   |_|            |___/                                              
    `);
    // await setTimeoutPromise(1_000);
    console.log(`Welcome to Employee Tracker! This is a command-line application that will help you manage a company's employee database`);
    // await setTimeoutPromise(3_000);
    console.log(`This application accepts user input - you have several options to interact with the database such as: view all departments,\nview all roles, view all employees, add a department, add a role, add an employee, and update an employee role, etc.`);
    // await setTimeoutPromise(4_000);
    console.log(`\nLet's start!\n`);
    // await setTimeoutPromise(1_000);
    userChoicesFn();
};

const userChoicesFn = async () => {
    const choice = await inquirer.prompt(
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: userChoices
        }
    );
    switch (choice.userChoice) {
        case 'View All Departments':
            await viewAllDepartments();
            userChoicesFn();
            break;
        case 'View All Roles':
            await viewAllRoles();
            userChoicesFn();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            userChoicesFn();
            break;
        case 'Add Department':
            await addDepartment();
            userChoicesFn();
            break;
        case 'Add Role':
            await addRole();
            userChoicesFn();
            break;
        default:
            console.log('\nThank you for using Employee Tracker!\n');
            connection.end();
            break;
    };
};

welcomeFn();