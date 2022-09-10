INSERT INTO department (dept_name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");


INSERT INTO emp_role (title, salary, department_id)
VALUES
    ("Sales Agent", 75000.00, 1),
    ("Sales Lead", 100000.00, 1),
    ("Software Engineer", 120000.00, 2),
    ("Lead Engineer", 145000.00, 2),
    ("Accountant", 75000.00, 3),
    ("lawyer", 175000.00, 4),
    ("Lead Attorney", 215000.00, 4);


INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
VALUES
    ("frank", "bruno", 2, null, 1),
    ("nina", "mercedes", 2, 1, 1),
    ("kill", "bill", 2, 1, 1),
    ("mike", "tyson", 3, 4, 2),
    ("Harold", "shipmen", 3, 4, 2),
    ("al", "pacino", 4, null, 2),
    ("robert", "deniro", 5, null, 3),
    ("tom", "Hanks", 6, 7, 4),
    ("Tracy", "Koch", 7, null, 4);
