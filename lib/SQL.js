const connection = require('../config')
const inquirer = require('inquirer');

// SQL class to store MySQL2 queries
class SQL {
    static async getDepartments() {
        const [rows, fields] = await connection.promise().query(`SELECT * FROM employee_tracker.department;`);
        return console.log(rows);
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

};

module.exports = SQL;