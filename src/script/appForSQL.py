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
    from SQL.RunTestCase import test_suite
    
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
    passed_test_results = []
    failed_test_results = []

    # Record failed test cases
    for test_case, test_failure in zip(suite._tests, test_suite_result.failures):
        test_case_name = test_case.id().split('.')[-1]
        failed_test_results.append({'name': test_case_name, 'score': '0/5', 'failure_message': str(test_failure[1]), 'status': 'failed'})
        print(f"{test_case_name} = 0/5")

    # Record passed test cases
    for test_case in suite._tests:
        test_case_name = test_case.id().split('.')[-1]
        if not any(result['name'] == test_case_name for result in failed_test_results):
            passed_test_results.append({'name': test_case_name, 'score': '5/5', 'status': 'passed'})
            print(f"{test_case_name} = 5/5")

    # Combine the arrays into a single test_results array
    test_results = passed_test_results + failed_test_results

    return test_results

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        filename = file.filename
        content = file.read()
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

        # Save file and test results to the database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
                       (filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        # Return response with percentage passed, failures, and test results
        response_data = {
            'percentage_passed': percentage_passed,
            'failures': failed_tests,
            'test_results': test_results
        }
        return jsonify(response_data)
    except Exception as e:
        # Print out any exceptions that occur for debugging
        print("Error:", str(e))
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)