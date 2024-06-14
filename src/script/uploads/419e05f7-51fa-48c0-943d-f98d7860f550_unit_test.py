import unittest
import mysql.connector

class TestGetAverageSalary(unittest.TestCase):
    def __init__(self, sql_query, db_connection, *args, **kwargs):
        super(TestGetAverageSalary, self).__init__(*args, **kwargs)
        self.sql_query = sql_query
        self.db_connection = db_connection

    def setUp(self):
        self.cursor = self.db_connection.cursor()
        # Execute the provided SQL query to set up the function
        for statement in self.sql_query.split('/'):
            if statement.strip():
                self.cursor.execute(statement)
        self.db_connection.commit()

    def tearDown(self):
        self.cursor.close()
        self.db_connection.rollback()

    def test_get_average_salary(self):
        # Create test data
        test_data = [
            (1, 1, 4000.00),
            (2, 1, 6000.00),
            (3, 2, 6000.00),
        ]
        self.cursor.executemany("INSERT INTO employees (employee_id, department_id, salary) VALUES (%s, %s, %s)", test_data)
        self.db_connection.commit()

        # Test cases
        test_cases = [
            {"department_id": 1, "expected_avg_salary": 5000.00},
            {"department_id": 2, "expected_avg_salary": 6000.00},
            {"department_id": 3, "expected_avg_salary": None},  # No employees in department 3
        ]

        for test in test_cases:
            with self.subTest(department_id=test["department_id"]):
                self.cursor.callproc("get_average_salary", [test["department_id"]])
                result = self.cursor.fetchone()[0]
                self.assertEqual(result, test["expected_avg_salary"])

def test_suite(sql_query, db_connection):
    suite = unittest.TestSuite()
    suite.addTest(TestGetAverageSalary(sql_query, db_connection, 'test_get_average_salary'))
    return suite