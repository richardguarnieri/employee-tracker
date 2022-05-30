-- Drop, Create and Use "employee_tracker" Database
DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

-- Create Tables
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    CONSTRAINT pk_department PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT pk_role PRIMARY KEY (id),
    CONSTRAINT fk_role_department_id FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT pk_employee PRIMARY KEY (id),
    CONSTRAINT fk_employee_role_id FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_employee_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id)
);