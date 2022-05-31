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

const getDepartments = async () => {
    const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.department`)
    return rows;
};
const getRoles = async () => {
    const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.role`)
    return rows;
};
const getEmployees = async () => {
    const [rows, fields] = await connection.promise().query(`
    SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name 
    FROM employee_tracker.employee
    `)
    return rows;
};

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
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the department?: ",
            validate: stringValidation
        }
    ]);
    await connection.promise().query(`
    INSERT INTO employee_tracker.department (name)
    VALUES (?);
    `, result.departmentName)
    console.log(`\nDepartment "${result.departmentName}" has been added to the database! Great work!\n`)
};

// Add Role
const addRole = async () => {
    // Get SQL query result - this will return an array of objects, each object with id and name property
    const departments = await getDepartments();
    // Get a list of the name property of the departments i.e., the department names. This is used on inquirer as the choices array.
    const listOfDepartments = departments.map(department => department.name);
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the title of the role?: ",
            validate: stringValidation
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role?: ",
            validate: numberValidation
        },
        {
            type: "list",
            name: "roleDepartment",
            message: "Which department does the role belong to?: ",
            choices: listOfDepartments
        }
    ])
    // Get the department id from the department name answer
    const departmentID = departments.filter(department => department.name === result.roleDepartment)[0].id;
    console.log(result);
    await connection.promise().query(`
    INSERT INTO employee_tracker.role (title, salary, department_id)
    VALUES (?, ?, ?);
    `, [result.roleTitle, result.roleSalary, departmentID])
    console.log(`\nRole "${result.roleTitle}" with a salary of "$${result.roleSalary}" under the "${result.roleDepartment}" department has been added to the database! Great work!\n`)
};

// Add Employee
const addEmployee = async () => {
    // Get SQL query result - this will return an array of objects for both roles and employees.
    const roles = await getRoles();
    const employees = await getEmployees();
    // Get a list of the title property of the roles and a list of the name property of the employees i.e., the role titles and employee names. This is used on inquirer as the choices array.
    const listOfRoles = roles.map(role => role.title);
    const listOfEmployees = employees.map(employee => employee.name);
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the employee's first name?: ",
            validate: stringValidation
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the employee's last name?: ",
            validate: stringValidation
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?: ",
            choices: listOfRoles
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?: ",
            choices: listOfEmployees
        }
    ])
    // Get the role id and employee id from the answer
    const roleID = roles.filter(role => role.title === result.employeeRole)[0].id;
    const employeeID = employees.filter(employee => employee.name === result.employeeManager)[0].id;
    // console.log(listOfRoles);
    // console.log(listOfEmployees);
    // console.log(employees);
    // console.log(roleID);
    // console.log(result);
    await connection.promise().query(`
    INSERT INTO employee_tracker.employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);
    `, [result.employeeFirstName, result.employeeLastName, roleID, employeeID])
    console.log(`\nEmployee "${result.employeeFirstName} ${result.employeeLastName}" with the role of "${result.employeeRole}" under the manager "${result.employeeManager}" has been added to the database! Great work!\n`)
};

// Update Employee Role
const updateEmployeeRole = async () => {
    // Get SQL query result - this will return an array of objects for both roles and employees.
    const roles = await getRoles();
    const employees = await getEmployees();
    // Get a list of the title property of the roles and a list of the name property of the employees i.e., the role titles and employee names. This is used on inquirer as the choices array.
    const listOfRoles = roles.map(role => role.title);
    const listOfEmployees = employees.map(employee => employee.name);
    const result = await inquirer.prompt([
        {
            type: "list",
            name: "employeeName",
            message: "Which employee's role do you want to update?: ",
            choices: listOfEmployees
        },
        {
            type: "list",
            name: "employeeRole",
            message: "which role do you want to assign the selected employee?: ",
            choices: listOfRoles
        }
    ])
    // Get the role id and employee id from the answer
    const roleID = roles.filter(role => role.title === result.employeeRole)[0].id;
    const employeeID = employees.filter(employee => employee.name === result.employeeName)[0].id;
    await connection.promise().query(`
    UPDATE employee_tracker.employee
    SET employee_tracker.employee.role_id = ?
    WHERE employee_tracker.employee.id = ?;
    `, [roleID, employeeID])
    console.log(`\nEmployee "${result.employeeName} has been updated with the role of "${result.employeeRole}"! Great work!\n`)
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

const numberValidation = (string) => {
    return (!Number(string)) ? false : true
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
        case 'Add Employee':
            await addEmployee();
            userChoicesFn();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            userChoicesFn();
            break;
        default:
            console.log('\nThank you for using Employee Tracker!\n');
            connection.end();
            break;
    };
};

welcomeFn();