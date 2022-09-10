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
    ('Jayad', ' Arshad', 1, null),
    ('Bader', 'Munir', 2, 1),
    ('Amina', 'Hayat', 3, 2),
    ('Ahmed', 'Shan', 3, 2),
    ('Tiah', 'Watt', 4, 5),
    ('Rez', 'Malek', 5, null),
    ('Usama', 'Arshad', 4, 5),
    ('Sponge', 'Bob', 6, null),
    ('Patrick', "starr", 7, null),
    ('Skye', 'Jackson', 8, null),
    ('Samuel', 'Jackson', 9, 8),
    ('Bob', 'Marley', 9, 8),
    ('Hamed', 'Ali', 10, null),
    ('John', 'Sina', 11, 10),
    ('Marc', 'Wick', 12, null),
    ('Bukayo', 'Saka', 13, 12),
    ('Emile', 'Smith', 14, null),
    ('Willan', 'Saliba', 15, 14),
    ('Ash', 'Chris', 15, 14);
