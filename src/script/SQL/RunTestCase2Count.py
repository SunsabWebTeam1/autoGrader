import unittest
import mysql.connector

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host='localhost',
    port='3306',
    user='root',
    password='password',
    database='file_storage'
)
def test_suite(uploaded_module):
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
        

    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)