-- View All Departments
SELECT * FROM employee_tracker.department

-- View All Roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM employee_tracker.role
INNER JOIN employee_tracker.department ON role.department_id = department.id;

-- View All Employees
SELECT role.id, role.title, department.name AS department, role.salary
FROM employee_tracker.role
INNER JOIN employee_tracker.department ON role.department_id = department.id;