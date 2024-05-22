import unittest
import pymysql

class TestSQLQueries(unittest.TestCase):
    
    def test_select_all_employees(self):
        conn = pymysql.connect(host='localhost', user='root', password='password', db='test')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM employees;")
        result = cursor.fetchall()
        expected = [('John', 'Doe', 1001), ('Jane', 'Doe', 1002), ('Bob', 'Smith', 1003)]
        self.assertEqual(result, expected)
        conn.close()

if __name__ == '__main__':
    unittest.main()