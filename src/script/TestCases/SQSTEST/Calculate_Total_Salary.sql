
CREATE PROCEDURE CALCULATE_TOTAL_SALARY (
    IN p_department_id INT,
    OUT p_total_salary DECIMAL(10, 2)
)
BEGIN
    SELECT SUM(salary) INTO p_total_salary
    FROM employees
    WHERE department_id = p_department_id;
END;