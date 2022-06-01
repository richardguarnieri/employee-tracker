// Import Dependencies
const connection = require('../config')
const inquirer = require('inquirer');
const cTable = require('console.table');

// Validation Functions for Inquirer
const stringValidation = (string) => {
    return (Number(string) || string.trim().length === 0) ? false : true
}

const numberValidation = (string) => {
    return (!Number(string)) ? false : true
}

// SQL Class to Store MySQL2 Queries
class SQL {
    static async getDepartments() {
        const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.department;`);
        return rows;
    };
    static async getRoles(){
        const [rows, fields] = await connection.promise().query(`SELECT role.id, role.title FROM employee_tracker.role;`);
        return rows;
    };
    static async getEmployees() {
        const [rows, fields] = await connection.promise().query(`
        SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name 
        FROM employee_tracker.employee;
        `);
        return rows;
    };
    static endConnection() {
        console.log('\nThank you for using Employee Tracker!\n');
        connection.end();
    }
    // --- MySQL Queries ---
    // View All Departments
    static async viewAllDepartments() {
        const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.department`)
        console.log('\n--------------------------------------------------')
        console.log('              Showing All Departments             ')
        console.log('--------------------------------------------------')
        console.table(rows)
    };
    // View All Roles
    static async viewAllRoles() {
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
    static async viewAllEmployees() {
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
    static async addDepartment() {
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
    static async addRole() {
        // Get SQL query result - this will return an array of objects, each object with id and name property
        const departments = await this.getDepartments();
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
        await connection.promise().query(`
        INSERT INTO employee_tracker.role (title, salary, department_id)
        VALUES (?, ?, ?);
        `, [result.roleTitle, result.roleSalary, departmentID])
        console.log(`\nRole "${result.roleTitle}" with a salary of "$${result.roleSalary}" under the "${result.roleDepartment}" department has been added to the database! Great work!\n`)
    };
    // Add Employee
    static async addEmployee() {
        // Get SQL query result - this will return an array of objects for both roles and employees.
        const roles = await this.getRoles();
        const employees = await this.getEmployees();
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
        await connection.promise().query(`
        INSERT INTO employee_tracker.employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);
        `, [result.employeeFirstName, result.employeeLastName, roleID, employeeID])
        console.log(`\nEmployee "${result.employeeFirstName} ${result.employeeLastName}" with the role of "${result.employeeRole}" under the manager "${result.employeeManager}" has been added to the database! Great work!\n`)
    };
    // Update Employee Role
    static async updateEmployeeRole() {
        // Get SQL query result - this will return an array of objects for both roles and employees.
        const roles = await this.getRoles();
        const employees = await this.getEmployees();
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
        console.log(`\nEmployee "${result.employeeName}" has been updated with the role of "${result.employeeRole}"! Great work!\n`)
    };
    // Other Methods....
    // Update Employee Manager
    static async updateEmployeeManager() {
        // Get SQL query result - this will return an array of objects for employees.
        const employees = await this.getEmployees();
        // Get a list of the name property of the employees i.e., the employee names. This is used on inquirer as the choices array.
        const listOfEmployees = employees.map(employee => employee.name);
        const listOfManagers = employees.map(employee => employee.name);
        listOfManagers.push('No Manager'); // Adding 'No Manager' as an option
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "employeeName",
                message: "Which employee's role do you want to update?: ",
                choices: listOfEmployees
            },
            {
                type: "list",
                name: "employeeManager",
                message: "which manager do you want to assign the selected employee?: ",
                choices: listOfManagers // *** The employee can choose to have himself as manager, this might be good or bad. To decide in future versions the best approach... ***
            }
        ])
        // Get the employee id and manager id from the answer
        const employeeID = employees.filter(employee => employee.name === result.employeeName)[0].id;
        const managerID = (result.employeeManager === 'No Manager') ? null : employees.filter(employee => employee.name === result.employeeManager)[0].id;
        await connection.promise().query(`
        UPDATE employee_tracker.employee
        SET employee_tracker.employee.manager_id = ?
        WHERE employee_tracker.employee.id = ?;
        `, [managerID, employeeID])
        return (managerID === null) 
            ? console.log(`\nNo Manager ("null" value) has been assigned to Employee "${result.employeeName}"! Great work!\n`)
            : console.log(`\nManager "${result.employeeManager}" has been assigned to Employee "${result.employeeName}"! Great work!\n`)
    };
    // View Employees by Manager
    static async viewEmployeesByManager() {
        // Get SQL query result - this will return an array of objects for employees.
        const employees = await this.getEmployees();
        // Get a list of the name property of the employees i.e., the employee names. This is used on inquirer as the choices array.
        const listOfEmployees = employees.map(employee => employee.name);
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "managerName",
                message: "Which manager do you want to see its employees?: ",
                choices: listOfEmployees
            }
        ])
        // Get the manager id from the answer
        const managerID = employees.filter(employee => employee.name === result.managerName)[0].id;
        const [rows, fields] = await connection.promise().query(`
        SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
        FROM employee_tracker.employee AS employee1
        LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
        INNER JOIN employee_tracker.role ON employee1.role_id = role.id
        INNER JOIN employee_tracker.department ON role.department_id = department.id
        WHERE employee1.manager_id = ?;
        `, managerID)
        console.log('\n--------------------------------------------------')
        console.log(`     Showing All Employees by Manager ${result.managerName}     `)
        console.log('--------------------------------------------------')
        return (rows.length) ? console.table(rows) : console.log(`${result.managerName} does not have employees assigned to him/her!\n`)
    };
    // View Employees by Department
    static async viewEmployeesByDepartment() {
        // Get SQL query result - this will return an array of objects, each object with id and name property
        const departments = await this.getDepartments();
        // Get a list of the name property of the departments i.e., the department names. This is used on inquirer as the choices array.
        const listOfDepartments = departments.map(department => department.name);
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "departmentName",
                message: "Which department do you want to see its employees?: ",
                choices: listOfDepartments
            }
        ])
        // Get the department id from the answer
        const departmentID = departments.filter(department => department.name === result.departmentName)[0].id;
        const [rows, fields] = await connection.promise().query(`
        SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
        FROM employee_tracker.employee AS employee1
        LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
        INNER JOIN employee_tracker.role ON employee1.role_id = role.id
        INNER JOIN employee_tracker.department ON role.department_id = department.id
        WHERE department.id = ?;
        `, departmentID)
        console.log('\n--------------------------------------------------')
        console.log(`     Showing All Employees by Department ${result.departmentName}     `)
        console.log('--------------------------------------------------')
        return (rows.length) ? console.table(rows) : console.log(`${result.departmentName} does not have employees assigned to it!\n`)
    };
    // Delete Department
    static async deleteDepartment() { // *** Would be great to add a doble validation to ensure users do not accidentally delete a department in future versions ***
        // Get SQL query result - this will return an array of objects, each object with id and name property
        const departments = await this.getDepartments();
        // Get a list of the name property of the departments i.e., the department names. This is used on inquirer as the choices array.
        const listOfDepartments = departments.map(department => department.name);
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "departmentName",
                message: "Which department do you want to delete?: ",
                choices: listOfDepartments
            }
        ])
        // Get the department id from the department name answer
        const departmentID = departments.filter(department => department.name === result.departmentName)[0].id;
        try {
            await connection.promise().query(`
            DELETE FROM employee_tracker.department
            WHERE employee_tracker.department.id = ?;
            `, departmentID)
            console.log(`\nDepartment "${result.departmentName}" has been deleted from the database! Great work!\n`)
        } catch (err) {
            console.log(`Department "${result.departmentName}" cannot be deleted! Please ensure you do not have roles / employees assigned to this department before deleting!\n`);
        }
    };
    // Delete Role
    static async deleteRole() { // *** Would be great to add a doble validation to ensure users do not accidentally delete a department in future versions ***
        // Get SQL query result - this will return an array of objects.
        const roles = await this.getRoles();
        // Get a list of the title property of the roles i.e., the role titles. This is used on inquirer as the choices array.
        const listOfRoles = roles.map(role => role.title);
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "roleName",
                message: "Which role do you want to delete?: ",
                choices: listOfRoles
            }
        ])
        // Get the role id from the answer
        const roleID = roles.filter(role => role.title === result.roleName)[0].id;
        try {
            await connection.promise().query(`
            DELETE FROM employee_tracker.role
            WHERE employee_tracker.role.id = ?;
            `, roleID)
            console.log(`\nRole "${result.roleName}" has been deleted from the database! Great work!\n`)
        } catch (err) {
            console.log(`Role "${result.roleName}" cannot be deleted! Please ensure you do not have employees assigned to this role before deleting!\n`);
        }
    };
    // Delete Employee
    static async deleteEmployee() { // *** Would be great to add a doble validation to ensure users do not accidentally delete a department in future versions ***
        // Get SQL query result - this will return an array of objects.
        const employees = await this.getEmployees();
        // Get a list of the name property of the employees i.e., the employee names. This is used on inquirer as the choices array.
        const listOfEmployees = employees.map(employee => employee.name);
        const result = await inquirer.prompt([
            {
                type: "list",
                name: "employeeName",
                message: "Which employee do you want to delete?: ",
                choices: listOfEmployees
            }
        ])
        // Get the role id and employee id from the answer
        const employeeID = employees.filter(employee => employee.name === result.employeeName)[0].id;
        await connection.promise().query(`
        DELETE FROM employee_tracker.employee
        WHERE employee_tracker.employee.id = ?;
        `, employeeID)
        console.log(`\nEmployee "${result.employeeName}" has been deleted from the database! Great work!\n`)
    };
    // View Departments Salary Budget
    static async viewDepartmentsSalaryBudget() {
        const [rows, fields] = await connection.promise().query(`
        SELECT employee_tracker.department.name AS department_name, SUM(employee_tracker.role.salary) AS department_budget
        FROM employee_tracker.role
        LEFT JOIN employee_tracker.department ON employee_tracker.role.department_id = employee_tracker.department.id
        GROUP BY employee_tracker.department.name
        ORDER BY department_budget DESC;
        `)
        console.log('\n--------------------------------------------------')
        console.log('          Showing All Departments Budget          ')
        console.log('--------------------------------------------------')
        console.table(rows)
    };
};

module.exports = SQL;