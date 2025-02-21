const inquirer = require("inquirer").default;
const pool = require("../db/connection.js");
const consoleTable = require("console.table");

function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role",
                    "Exit",
                ],
            },
        ])
        .then((answer) => {
            switch (answer.choice) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    console.log("Goodbye!");
                    process.exit();
            }
        });
}

// **View Departments**
async function viewDepartments() {
    try {
        const result = await pool.query("SELECT * FROM department;");
        console.table(result.rows);
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
    mainMenu();
}

// **View Roles**
async function viewRoles() {
    try {
        const result = await pool.query(
            `SELECT role.id, role.title, department.name AS department, role.salary
             FROM role
             JOIN department ON role.department_id = department.id;`
        );
        console.table(result.rows);
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
    mainMenu();
}

// **View Employees**
async function viewEmployees() {
    try {
        const result = await pool.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, 
             department.name AS department, role.salary, 
             CONCAT(manager.first_name, ' ', manager.last_name) AS manager
             FROM employee
             JOIN role ON employee.role_id = role.id
             JOIN department ON role.department_id = department.id
             LEFT JOIN employee manager ON employee.manager_id = manager.id;`
        );
        console.table(result.rows);
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
    mainMenu();
}

// **Add Department**
async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the new department name:",
        },
    ]);

    try {
        await pool.query("INSERT INTO department (name) VALUES ($1)", [answer.name]);
        console.log("Department added successfully!");
    } catch (error) {
        console.error("Error adding department:", error);
    }
    mainMenu();
}

// **Add Role**
async function addRole() {
    const departments = await pool.query("SELECT * FROM department;");
    const departmentChoices = departments.rows.map((dept) => ({
        name: dept.name,
        value: dept.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the new role title:",
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this role:",
        },
        {
            type: "list",
            name: "department_id",
            message: "Select the department:",
            choices: departmentChoices,
        },
    ]);

    try {
        await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [
            answer.title,
            answer.salary,
            answer.department_id,
        ]);
        console.log("Role added successfully!");
    } catch (error) {
        console.error("Error adding role:", error);
    }
    mainMenu();
}

// **Add Employee**
async function addEmployee() {
    const roles = await pool.query("SELECT * FROM role;");
    const roleChoices = roles.rows.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const employees = await pool.query("SELECT * FROM employee;");
    const managerChoices = employees.rows.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
    }));
    managerChoices.unshift({ name: "None", value: null });

    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roleChoices,
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: managerChoices,
        },
    ]);

    try {
        await pool.query(
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
            [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
        );
        console.log("Employee added successfully!");
    } catch (error) {
        console.error("Error adding employee:", error);
    }
    mainMenu();
}

// **Update Employee Role**
async function updateEmployeeRole() {
    const employees = await pool.query("SELECT * FROM employee;");
    const employeeChoices = employees.rows.map((emp) => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id,
    }));

    const roles = await pool.query("SELECT * FROM role;");
    const roleChoices = roles.rows.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select the employee to update:",
            choices: employeeChoices,
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the new role:",
            choices: roleChoices,
        },
    ]);

    try {
        await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [
            answer.role_id,
            answer.employee_id,
        ]);
        console.log("Employee role updated successfully!");
    } catch (error) {
        console.error("Error updating employee role:", error);
    }
    mainMenu();
}

mainMenu();