from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import unittest

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host='localhost',
    port='3306',
    user='root',
    password='password',
    database='file_storage'
)

def run_test_suite(uploaded_module, mysql_connection):
    from SQL.PLSQLTestCase import test_suite
    
    # Create a test suite instance
    test_suite_instance = test_suite(uploaded_module, mysql_connection)
    
    # Run the test suite
    test_runner = unittest.TextTestRunner()
    test_suite_result = test_runner.run(test_suite_instance)

    # Load test cases from the test suite
    suite = test_suite(uploaded_module, mysql_connection)

    # Generate test results
    test_results = generate_test_results(suite, test_suite_result)
    
    return test_results

def generate_test_results(suite, test_suite_result):
    test_results = []

    # Iterate over all test cases in the suite
    for test_case in suite._tests:
        if test_case is not None:
            test_case_name = test_case.id().split('.')[-1]

            # Initialize variables to track test status and failure message
            test_passed = True
            failure_message = ""

            # Check if the test case encountered an error
            for test_error, traceback in test_suite_result.errors:
                if test_case_name in str(test_error):
                    failure_message = str(test_error)
                    test_passed = False
                    break

            # Check if the test case encountered a failure
            for test_failure, traceback in test_suite_result.failures:
                if test_case_name in str(test_failure):
                    failure_message = str(test_failure)
                    test_passed = False
                    break

            # Append test result based on pass/fail status
            if test_passed:
                test_results.append({
                    'name': test_case_name,
                    'score': '5/5',
                    'status': 'passed'
                })
                print(f"{test_case_name} = 5/5")
            else:
                test_results.append({
                    'name': test_case_name,
                    'score': '0/5',
                    'failure_message': failure_message,
                    'status': 'failed'
                })
                print(f"{test_case_name} = 0/5")
        else:
            print("Warning: test_case is None in test suite")

    return test_results

@app.route('/upload', methods=['POST'])
def upload_file_sql(filename, content):
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        size = len(content)

        # Decode the content and strip any leading/trailing whitespace
        uploaded_query = content.decode('utf-8').strip()

        # Execute the uploaded SQL query directly against the database
        cursor = mysql_connection.cursor()
        cursor.execute(uploaded_query)
        result = cursor.fetchall()
        cursor.close()

        # Run the tests and get the test results directly
        test_results = run_test_suite(uploaded_query, mysql_connection)

        # Extract information from the test results
        passed_tests = sum(1 for test_result in test_results if test_result['status'] == 'passed')
        failed_tests = sum(1 for test_result in test_results if test_result['status'] == 'failed')
        total_tests = passed_tests + failed_tests

        # Calculate the percentage of passed tests
        percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0
         # Calculate points based on percentage
        total_points = 5 * total_tests
        points_obtained = 5 * passed_tests
        # Save file and test results to the database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
                       (filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
                              f"Score: {points_obtained}/{total_points}"
    
        print(test_result_message)

        # Return response with percentage passed, failures, and test results
        return {'percentage_passed': percentage_passed, 'failures': failed_tests,
                'points_obtained': points_obtained, 'total_points': total_points,
                'test_results': test_results}
    except Exception as e:
        # Print out any exceptions that occur for debugging
        print("Error:", str(e))
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)