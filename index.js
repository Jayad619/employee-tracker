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

// Displays departments in db
function displayDepartments() {
  const sql = `SELECT id, dept_name FROM department`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// Display roles in db
function displayRoles() {
  const sql = `SELECT emp_role.title AS Title, 
                  emp_role.id AS "Title ID", 
                  department.dept_name As Department, 
                  emp_role.salary AS Salary 
                  FROM emp_role 
                  LEFT JOIN department ON emp_role.department_id = department.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// Displays Employees in db
function displayEmployees() {
  const sql = `SELECT employee.id AS "Employee ID", 
                  employee.first_name AS "First Name", 
                  employee.last_name AS "Last Name", 
                  emp_role.title AS "Title", 
                  department.dept_name AS "Department", 
                  emp_role.salary AS "Salary" 
                  FROM employee
                  LEFT JOIN emp_role
                  ON employee.emp_role_id = emp_role.id
                  LEFT JOIN department
                  ON emp_role.department_id = department.id`;
  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// add a Department to the db
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "deptName",
        message: "add new department?",
        type: "input",
      },
    ])
    .then(({ deptName }) => {
      const sql = `INSERT INTO department (dept_name)
                      VALUES (?)`;
      const params = [deptName];
      connection.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log(`Department ${deptName} inserted in database!`);
        displayDepartments();
      });
    });
}
