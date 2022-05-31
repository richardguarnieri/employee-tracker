// Import Dependencies
const inquirer = require('inquirer');
const { setTimeout: setTimeoutPromise } = require('timers/promises');
const SQL = require('./lib/SQL');

// Array Used in Inquirer for userChoiceFn()
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

const init = async () => {
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
    console.log(`Welcome to Employee Tracker! This is a CLI (command-line interface) application that will help you manage a company's employee database`);
    // await setTimeoutPromise(3_000);
    console.log(`This application accepts user input - you have several options to interact with the database such as: view all departments,\nview all roles, view all employees, add a department, add a role, add an employee, and update an employee role, etc.`);
    // await setTimeoutPromise(4_000);
    console.log(`\nLet's start!\n`);
    // await setTimeoutPromise(1_000);
    userChoicesFn();
};

const userChoicesFn = async () => {
    const choice = await inquirer.prompt([
        {
            type: "list",
            name: "userChoice",
            message: "What would you like to do?",
            choices: userChoices
        }
    ]);
    switch (choice.userChoice) {
        case 'View All Departments':
            await SQL.viewAllDepartments();
            userChoicesFn();
            break;
        case 'View All Roles':
            await SQL.viewAllRoles();
            userChoicesFn();
            break;
        case 'View All Employees':
            await SQL.viewAllEmployees();
            userChoicesFn();
            break;
        case 'Add Department':
            await SQL.addDepartment();
            userChoicesFn();
            break;
        case 'Add Role':
            await SQL.addRole();
            userChoicesFn();
            break;
        case 'Add Employee':
            await SQL.addEmployee();
            userChoicesFn();
            break;
        case 'Update Employee Role':
            await SQL.updateEmployeeRole();
            userChoicesFn();
            break;
        default:
            SQL.endConnection();
            break;
    };
};

init();