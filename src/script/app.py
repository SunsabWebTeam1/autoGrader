import os
import uuid
import unittest
import importlib.util
from flask import Flask, request, jsonify
from flask_cors import CORS
from io import StringIO
import mysql.connector

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# MySQL connection setup
db_config = {
    'user': 'user',
    'password': 'password',
    'host': 'localhost',
    'database': 'file_storage'
}

def save_file_to_db(filename, size, content, grade_percentage):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = """
    INSERT INTO Files (filename, size, content, grade_percentage)
    VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (filename, size, content, grade_percentage))
    conn.commit()
    cursor.close()
    conn.close()

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
def upload_submission():
    if 'file' not in request.files or 'unit_test_id' not in request.form:
        return jsonify({'error': 'Invalid request'}), 400
    file = request.files['file']
    unit_test_id = request.form['unit_test_id']
    
    unit_test_path = os.path.join(UPLOAD_FOLDER, f"{unit_test_id}_unit_test.py")
    if not os.path.exists(unit_test_path):
        return jsonify({'error': 'Unit test file not found'}), 404
    
    submission_path = os.path.join(UPLOAD_FOLDER, f"{unit_test_id}_submission.sql")
    file_content = file.read()
    with open(submission_path, 'wb') as f:
        f.write(file_content)
    
    # Run the unit tests
    result = run_unit_tests(unit_test_path, submission_path)
    
    # Calculate grade percentage
    total_tests = result['testsRun']
    failed_tests = result['failures'] + result['errors']
    grade_percentage = ((total_tests - failed_tests) / total_tests) * 100 if total_tests > 0 else 0
    result['grade_percentage'] = grade_percentage

    # Save file to database
    save_file_to_db(file.filename, len(file_content), file_content, grade_percentage)
    
    return jsonify(result), 200

def run_unit_tests(unit_test_path, submission_path):
    # Import the unit test file as a module
    spec = importlib.util.spec_from_file_location("unit_test_module", unit_test_path)
    unit_test_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(unit_test_module)
    
    # Replace `uploaded_module` with the actual module for the submission
    # Here, you should load the SQL module if possible
    # For demonstration purposes, we'll simulate it as a dummy module
    class DummySQLModule:
        NUMBER = int
    
    # Create a new MySQL connection for the test suite
    mysql_connection = mysql.connector.connect(**db_config)
    
    suite = unit_test_module.test_suite(DummySQLModule, mysql_connection)
    
    # Redirect stdout to capture unittest output
    buffer = StringIO()
    runner = unittest.TextTestRunner(stream=buffer, verbosity=2)
    result = runner.run(suite)
    
    output = buffer.getvalue()
    
    test_results = generate_test_results(suite, result)
    
    return {
        'output': output,
        'testsRun': result.testsRun,
        'failures': len(result.failures),
        'errors': len(result.errors),
        'failures_list': [str(failure) for failure in result.failures],
        'errors_list': [str(error) for error in result.errors],
        'test_results': test_results
    }

if __name__ == '__main__':
    app.run(debug=True)
