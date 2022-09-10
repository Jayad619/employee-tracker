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
