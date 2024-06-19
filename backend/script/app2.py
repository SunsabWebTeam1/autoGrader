from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import uuid
import unittest
import importlib.util

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'  # Replace with your actual upload folder path
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host='localhost',
    port='3306',
    user='root',
    password='password',
    database='file_storage'
)

def run_test_suite(unit_test_path, uploaded_module, mysql_connection):
    spec = importlib.util.spec_from_file_location("unit_test_module", unit_test_path)
    unit_test_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(unit_test_module)
    
    test_suite_instance = unit_test_module.test_suite(uploaded_module,mysql_connection)
    # Run the test suite
    test_runner = unittest.TextTestRunner()
    test_suite_result = test_runner.run(test_suite_instance)

    # Load test cases from the test suite
    suite = unit_test_module.test_suite(uploaded_module, mysql_connection)
    # Generate test results
    test_results = generate_test_results(suite, test_suite_result)
    
    return test_results

def generate_test_results(suite, test_suite_result):
    passed_test_results = []
    failed_test_results = []

    # Record failed test cases
    for test_case, test_failure in zip(suite._tests, test_suite_result.failures):
        if test_case is not None:
            test_case_name = test_case.id().split('.')[-1]
            failed_test_results.append({'name': test_case_name, 'score': '0/5', 'failure_message': str(test_failure[1]), 'status': 'failed'})
            print(f"{test_case_name} = 0/5")
        else:
            print("Warning: test_case is None in failures")

    # Record passed test cases
    for test_case in suite._tests:
        if test_case is not None:
            test_case_name = test_case.id().split('.')[-1]
            if not any(result['name'] == test_case_name for result in failed_test_results):
                passed_test_results.append({'name': test_case_name, 'score': '5/5', 'status': 'passed'})
                print(f"{test_case_name} = 5/5")
        else:
            print("Warning: test_case is None in passed tests")

    # Combine the arrays into a single test_results array
    test_results = passed_test_results + failed_test_results

    return test_results

@app.route('/upload_unit_test', methods=['POST'])
def upload_unit_test():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    unit_test_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_FOLDER, f"{unit_test_id}_unit_test.py")
    file.save(file_path)
    
    return jsonify({'unit_test_id': unit_test_id}), 200

@app.route('/upload_submission', methods=['POST'])
def upload_file_sql():
    if 'file' not in request.files or 'unit_test_id' not in request.form:
        return jsonify({'error': 'Invalid request'}), 400
    file = request.files['file']
    unit_test_id = request.form['unit_test_id']
    
    unit_test_path = os.path.join(UPLOAD_FOLDER, f"{unit_test_id}_unit_test.py")
    if not os.path.exists(unit_test_path):
        return jsonify({'error': 'Unit test file not found'}), 404

    try:
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
        test_results = run_test_suite(unit_test_path, uploaded_query, mysql_connection)

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
                       (file.filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
                              f"Score: {points_obtained}/{total_points}"
    
        print(test_result_message)

        # Return response with percentage passed, failures, and test results
        return jsonify({'percentage_passed': percentage_passed, 'failures': failed_tests,
                    'points_obtained': points_obtained, 'total_points': total_points,
                    'test_results': test_results})
    except Exception as e:
        # Print out any exceptions that occur for debugging
        print("Error:", str(e))
        print("Type of 'e':", type(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)