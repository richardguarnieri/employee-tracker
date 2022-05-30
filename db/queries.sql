-- View All Departments
SELECT * FROM employee_tracker.department

-- View All Roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM employee_tracker.role
INNER JOIN employee_tracker.department ON role.department_id = department.id;

-- View All Employees (Incl. Self Join)
SELECT employee1.id, employee1.first_name, employee1.last_name, role.title, department.name AS department, role.salary, CONCAT(employee2.first_name, ' ', employee2.last_name) AS manager
FROM employee_tracker.employee employee1
LEFT JOIN employee_tracker.employee employee2 ON employee1.manager_id = employee2.id
INNER JOIN employee_tracker.role ON employee1.role_id = role.id
INNER JOIN employee_tracker.department ON role.department_id = department.id;