//download dependicies
const mysql = require("mysql2");
const inquirer = require("inquirer");

// connection to the SQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "nextS+3p",
  database: "employeesDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  menu();
});

// Main Menu
const menu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "what would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee's role",
          "exit",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.action) {
        case "view all departments":
          query = "SELECT * FROM department";
          viewAll(query);
          break;

        case "view all roles":
          query =
            "SELECT * FROM role JOIN department ON department.department_id = role.department_id ";
          viewAll(query);
          break;

        case "view all employees":
          query =
            "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.role_id JOIN department ON role.department_id = department.department_id ORDER BY department.name ";
          viewAll(query);
          break;

        case "add a department":
          addDepartment();
          break;

        case "add a role":
          addRole();
          break;

        case "add an employee":
          addEmployee();
          break;

        case "update an employee's role":
          updateRole();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
};

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

// add a Role to the database
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "which role would you like to add?",
        type: "input",
      },
      {
        name: "salary",
        message: "Salary for this role?",
        type: "input",
      },
      {
        name: "department_id",
        message: "ID for the department this role associated with?",
        type: "input",
      },
    ])
    .then(({ title, salary, department_id }) => {
      const sql = `INSERT INTO emp_role (title, salary, department_id)
                      VALUES (?, ?, ?)`;
      const params = [title, salary, department_id];
      connection.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log(`Role ${title} added!`);
        displayRoles();
      });
    });
}

// add an Employee database
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "employee's first name?",
        type: "input",
      },
      {
        name: "last_name",
        message: "employee's last name?",
        type: "input",
      },
      {
        name: "role",
        message: "What is the employee's role? (Enter the role ID number)",
        type: "input",
      },
      {
        name: "manager",
        message:
          "Who is the employee's manager? (Enter the managers ID number)",
        type: "input",
      },
    ])
    .then(({ first_name, last_name, role, manager }) => {
      const sql = `INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
                      VALUES (?, ?, ?, ?)`;
      const params = [first_name, last_name, role, manager];
      connection.query(sql, params, (err, res) => {
        if (err) throw err;
        console.log(`Employee ${first_name} ${last_name} was added!`);
        displayEmployees();
      });
    });
}

// Function to update an Employee's Role in the database
function updateEmployee() {
  inquirer
    .prompt([
      {
        name: "employee_id",
        message: " ID of the employee that will be updated",
        type: "input",
      },
      {
        name: "emp_role",
        message: " employee's new role id? ",
        type: "input",
      },
    ])
    .then(({ employee_id, emp_role }) => {
      const sql = `UPDATE employee SET emp_role_id = ?
                      WHERE id = ?`;
      const params = [emp_role, employee_id];
      connection.query(sql, params, (err, res) => {
        if (err) throw err;
        displayEmployees();
      });
    });
}
