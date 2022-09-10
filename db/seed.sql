INSERT INTO department (name)
  VALUES ('Legal'),
  ('Sales'),
  ('Marketing'),
  ('Engineering');


  INSERT INTO role (title, salary, department_id)
  VALUES ('manager', 100000,  1),
  ('sales asssociate', 70000,  2),
  ('lawyer', 250000,  1),
  ('slogan guru', 120000,  3),
  ('developer', 90000000,  4);

INSERT INTO employee (first_name,
  last_name, role_id, manager_id)
  VALUES ('Jayad', 'Arshad', 1, 1),
  ('Usama', 'Arshad', 1, 2),
  ('Bader', 'Munir', 2, 1),
  ('Amina', 'Hayat', 3, 2),
  ('Aisha', 'Rahman', 4, 1),
  ('Sina', 'Doretska', 5, 2);
