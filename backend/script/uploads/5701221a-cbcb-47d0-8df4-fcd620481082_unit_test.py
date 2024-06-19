import unittest

def test_suite(uploaded_module, mysql_connection):
    class TestPLSQLQueries(unittest.TestCase):
        def test_calculate_total_salary_department_100(self):
            try:
                # Set up the test environment (if needed)

                # Call the stored procedure to calculate the total salary for department 100
                cursor = mysql_connection.cursor()

                # Replace 'CALCULATE_TOTAL_SALARY' with the actual name of your PL/SQL procedure
                cursor.callproc("CALCULATE_TOTAL_SALARY", (100,))

                # Get the output parameter value
                total_salary = cursor.var(uploaded_module.NUMBER)
                cursor.execute("""
                    BEGIN
                        CALCULATE_TOTAL_SALARY(:1, :2);
                    END;
                """, (100, total_salary))

                # Check if the total salary matches the expected value
                expected_total_salary = 5000  # Replace with the expected total salary for department 100
                self.assertEqual(total_salary.getvalue(), expected_total_salary)

            finally:
                # Clean up resources (if needed)
                cursor.close()

        def test_calculate_total_salary_department_200(self):
            try:
                # Set up the test environment (if needed)

                # Call the stored procedure to calculate the total salary for department 200
                cursor = mysql_connection.cursor()

                # Replace 'CALCULATE_TOTAL_SALARY' with the actual name of your PL/SQL procedure
                cursor.callproc("CALCULATE_TOTAL_SALARY", (200,))

                # Get the output parameter value
                total_salary = cursor.var(uploaded_module.NUMBER)
                cursor.execute("""
                    BEGIN
                        CALCULATE_TOTAL_SALARY(:1, :2);
                    END;
                """, (200, total_salary))

                # Check if the total salary matches the expected value
                expected_total_salary = 4000  # Replace with the expected total salary for department 200
                self.assertEqual(total_salary.getvalue(), expected_total_salary)

            finally:
                # Clean up resources (if needed)
                cursor.close()

        def test_calculate_total_salary_invalid_department(self):
            try:
                # Set up the test environment (if needed)

                # Call the stored procedure to calculate the total salary for an invalid department
                cursor = mysql_connection.cursor()

                # Replace 'CALCULATE_TOTAL_SALARY' with the actual name of your PL/SQL procedure
                cursor.callproc("CALCULATE_TOTAL_SALARY", (999,))

                # Get the output parameter value
                total_salary = cursor.var(uploaded_module.NUMBER)
                cursor.execute("""
                    BEGIN
                        CALCULATE_TOTAL_SALARY(:1, :2);
                    END;
                """, (999, total_salary))

                # Check if the total salary is None for an invalid department
                self.assertIsNone(total_salary.getvalue())

            finally:
                # Clean up resources (if needed)
                cursor.close()

    return unittest.TestLoader().loadTestsFromTestCase(TestPLSQLQueries)