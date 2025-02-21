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
                choices: ["View all departments", "Exit"],
            },
        ])
        .then((answer) => {
            switch (answer.choice) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "Exit":
                    console.log("Goodbye!");
                    process.exit();
            }
        });
}

// ✅ **ASYNC FUNCTION TO FETCH & DISPLAY DEPARTMENTS**
async function viewDepartments() {
    try {
        const result = await pool.query("SELECT * FROM department;");
        console.table(result.rows);  // ✅ This prints department data
    } catch (error) {
        console.error("Error fetching departments:", error);
    }
    mainMenu();  // ✅ Returns to menu
}

mainMenu();
