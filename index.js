//download dependicies

const mysql = require("mysql2");
const inquirer = require("inquirer");
const { connect } = require("http2");

// connection to the SQL server
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

// Main Menu
function mainMenu() {
  inquirer
    .prompt([
      //Prompt the user
      {
        type: "list",
        name: "menu",
        message: "choose an option from the list?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
        ],
      },
    ])
    .then((menuChoice) => {
      switch (menuChoice.menu) {
        case "View Departments":
          displayDepartments();
          break;
        case "View Roles":
          displayRoles();
          break;
        case "View Employees":
          displayEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
        default:
          mainMenu();
      }
    });
}
