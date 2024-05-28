import unittest


def test_suite(uploaded_module, mysql_connection):
    class TestSQLQueries(unittest.TestCase):
        def test_select_all_employees(self):
            try: 
                cursor = mysql_connection.cursor()
                cursor.execute(uploaded_module)
                result = cursor.fetchall()
                expected = [('John', 'Doe', 1001), ('Jane', 'Doe', 1002), ('Bob', 'Smith', 1003)]
                self.assertEqual(result, expected)
            finally:
                cursor.close()
        

    return unittest.TestLoader().loadTestsFromTestCase(TestSQLQueries)