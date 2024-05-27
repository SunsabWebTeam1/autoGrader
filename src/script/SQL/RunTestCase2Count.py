import unittest

def test_suite(uploaded_module, mysql_connection):
    class TestSQLQueries(unittest.TestCase):
        def test_count_employees(self):
            try:
                cursor = mysql_connection.cursor()
                cursor.execute(uploaded_module)
                result = cursor.fetchone()[0]
                expected = 3
                self.assertEqual(result, expected)
            finally:
                cursor.close()
        def test_count_employeesfail(self):
            try:
                cursor = mysql_connection.cursor()
                cursor.execute(uploaded_module)
                result = cursor.fetchone()[0]
                expected = 2
                self.assertEqual(result, expected)
            finally:
                cursor.close()
        def test_count_employeespass(self):
            try:
                cursor = mysql_connection.cursor()
                cursor.execute(uploaded_module)
                result = cursor.fetchone()[0]
                expected = 3
                self.assertEqual(result, expected)
            finally:
                cursor.close()
        

    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)