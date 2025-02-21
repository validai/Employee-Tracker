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
                choices: ["View all departments", "View all employees", "View all roles", "Exit"],
            },
        ])
        .then((answer) => {
            switch (answer.choice) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "Exit":
                    console.log("Goodbye!");
                    process.exit();
            }
        });
}

// **ASYNC FUNCTION TO FETCH & DISPLAY DEPARTMENTS**
async function viewDepartments() {
    try {
        const result = await pool.query("SELECT * FROM department;");
        console.table(result.rows); // ✅ This prints department data
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
    mainMenu(); // ✅ Returns to menu
}

// **ASYNC FUNCTION TO FETCH & DISPLAY EMPLOYEES**
async function viewEmployees() {
    try {
        const result = await pool.query("SELECT * FROM employee;");
        console.table(result.rows); // ✅ This prints employee data
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
    mainMenu(); // ✅ Returns to menu
}

// **ASYNC FUNCTION TO FETCH & DISPLAY ROLES**
async function viewRoles() {
    try {
        const result = await pool.query("SELECT * FROM role;");
        console.table(result.rows); // ✅ This prints role data
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
    mainMenu(); // ✅ Returns to menu
}

mainMenu();
