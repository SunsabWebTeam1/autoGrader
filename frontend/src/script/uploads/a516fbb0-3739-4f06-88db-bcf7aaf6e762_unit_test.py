import unittest

def test_suite(sql_query, mysql_connection):
    class TestSQLQueries(unittest.TestCase):
        def test_select_all_employees(self):
            try: 
                cursor = mysql_connection.cursor()
                cursor.execute(sql_query[0])
                result = cursor.fetchall()
                expected = [('John', 'Doe', 1001), ('Jane', 'Doe', 1002), ('Bob', 'Smith', 1003)]
                self.assertEqual(result, expected)
            finally:
                cursor.close()
        
        def test_select_employees_by_department(self):
            try:
                cursor = mysql_connection.cursor()
                cursor.execute("SELECT * FROM employees WHERE department_id = 1001")
                result = cursor.fetchall()
                expected = [('John', 'Doe', 1001)]
                self.assertEqual(result, expected)
            finally:
                cursor.close()

        def test_select_salary_above_threshold(self):
            try:
                cursor = mysql_connection.cursor()
                cursor.execute("SELECT * FROM employees WHERE salary > 50000")
                result = cursor.fetchall()
                self.assertTrue(len(result) > 0)  # At least one employee should have a salary above 50000
            finally:
                cursor.close()
        
    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)