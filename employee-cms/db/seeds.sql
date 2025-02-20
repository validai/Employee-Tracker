-- departments
INSERT INTO department (name) VALUES 
('Engineering'), 
('Sales'), 
('HR');

-- roles 
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1), 
('Sales Representative', 50000, 2), 
('Business Manager', 70000, 3);

-- employees 
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Eric', 'Cordoba', 1, NULL), 
('James', 'Smith', 2, NULL), 
('Clive', 'Davis', 3, 1);
