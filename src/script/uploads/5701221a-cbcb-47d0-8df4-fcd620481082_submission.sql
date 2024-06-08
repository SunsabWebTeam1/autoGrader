-- Procedure: CALCULATE_TOTAL_SALARY

-- Description: This stored procedure calculates the total salary for a specified department.

-- Parameters:
--   p_department_id (IN INT): The department ID for which the total salary is to be calculated.
--   p_total_salary (OUT DECIMAL(10, 2)): The total salary calculated for the specified department.
--   Table Name is employees
CREATE PROCEDURE CALCULATE_TOTAL_SALARY (
    IN p_department_id INT,
    OUT p_total_salary DECIMAL(10, 2)
)
BEGIN
    SELECT SUM(salary) INTO p_total_salary
    FROM employees
    WHERE department_id = p_department_id;
END 