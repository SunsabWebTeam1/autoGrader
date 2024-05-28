import unittest
import pymysql

class TestSQLQueries(unittest.TestCase):

    def read_sql_file(self, file_path):
        with open(file_path, 'r') as file:
            return file.read()
            
    
    def test_select_all_employees(self):

        sql_query = self.read_sql_file('SelectFromEmployees.sql')

        conn = pymysql.connect(host='localhost', user='root', password='password', db='test')
        cursor = conn.cursor()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        expected = [('John', 'Doe', 1001), ('Jane', 'Doe', 1002), ('Bob', 'Smith', 1003)]
        self.assertEqual(result, expected)
        conn.close()

if __name__ == '__main__':
    unittest.main()