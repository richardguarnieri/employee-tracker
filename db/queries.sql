-- View All Departments
SELECT * FROM employee_tracker.department

-- View All Roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM employee_tracker.role
INNER JOIN employee_tracker.department ON role.department_id = department.id;

-- View All Employees (incl. Self Join)
SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
FROM employee_tracker.employee AS employee1
LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
INNER JOIN employee_tracker.role ON employee1.role_id = role.id
INNER JOIN employee_tracker.department ON role.department_id = department.id;

-- Add Department
INSERT INTO employee_tracker.department (name)
VALUES (?);

-- Add Role
INSERT INTO employee_tracker.role (title, salary, department_id)
VALUES (?, ?, ?);

-- Add Employee
INSERT INTO employee_tracker.employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);

-- Update Employee Role
UPDATE employee_tracker.employee
SET employee_tracker.employee.role_id = ?
WHERE employee_tracker.employee.id = ?;

-- Update Employee Manager
UPDATE employee_tracker.employee
SET employee_tracker.employee.manager_id = ?
WHERE employee_tracker.employee.id = ?;

-- View Employees by Manager
SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
FROM employee_tracker.employee AS employee1
LEFT JOIN employee_tracker.employee AS employee2 ON employee1.manager_id = employee2.id
INNER JOIN employee_tracker.role ON employee1.role_id = role.id
INNER JOIN employee_tracker.department ON role.department_id = department.id
WHERE employee1.manager_id = ?;

-- View Employees by Department

-- Delete Department

-- Delete Role

-- Delete Employee

-- View Department Salary Budget