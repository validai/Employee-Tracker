const inquirer = require("inquirer");
const pool = require("../db/connection.js");
const consoleTable = require("console.table");

// Add your logic here
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
          console.log("Showing departments...");
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }
    });
}

mainMenu();
