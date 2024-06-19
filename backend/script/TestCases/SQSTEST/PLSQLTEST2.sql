CREATE OR REPLACE FUNCTION get_average_salary(dept_id IN NUMBER) 
RETURN NUMBER 
IS
  avg_salary NUMBER;
BEGIN
  SELECT AVG(salary) INTO avg_salary 
  FROM employees 
  WHERE department_id = dept_id;
  RETURN avg_salary;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RETURN NULL;
  WHEN OTHERS THEN
    RETURN NULL;
END get_average_salary;
/