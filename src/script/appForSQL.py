from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import unittest
import importlib.util

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

def load_test_module(module_path):
    spec = importlib.util.spec_from_file_location("test_module", module_path)
    test_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(test_module)
    return test_module

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

# @app.route('/upload', methods=['POST'])
# def upload_file_sql(filename, content):
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'})

#     try:
#         size = len(content)

#         # Decode the content and strip any leading/trailing whitespace
#         uploaded_query = content.decode('utf-8').strip()

#         # Execute the uploaded SQL query directly against the database
#         cursor = mysql_connection.cursor()
#         cursor.execute(uploaded_query)
#         result = cursor.fetchall()
#         cursor.close()

#         # Run the tests and get the test results directly
#         test_results = run_test_suite(uploaded_query, mysql_connection)

#         # Extract information from the test results
#         passed_tests = sum(1 for test_result in test_results if test_result['status'] == 'passed')
#         failed_tests = sum(1 for test_result in test_results if test_result['status'] == 'failed')
#         total_tests = passed_tests + failed_tests

#         # Calculate the percentage of passed tests
#         percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0
#          # Calculate points based on percentage
#         total_points = 5 * total_tests
#         points_obtained = 5 * passed_tests
#         # Save file and test results to the database
#         cursor = mysql_connection.cursor()
#         cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
#                        (filename, size, content, percentage_passed))
#         mysql_connection.commit()
#         cursor.close()

#         test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
#                               f"Score: {points_obtained}/{total_points}"
    
#         print(test_result_message)

#         # Return response with percentage passed, failures, and test results
#         return {'percentage_passed': percentage_passed, 'failures': failed_tests,
#                 'points_obtained': points_obtained, 'total_points': total_points,
#                 'test_results': test_results}
#     except Exception as e:
#         # Print out any exceptions that occur for debugging
#         print("Error:", str(e))
#         return jsonify({'error': str(e)})

@app.route('/upload-assignment', methods=['POST'])
def upload_assignment():
    if 'testFile' not in request.files:
        return jsonify({'error': 'No test file part'})

    test_file = request.files['testFile']

    if test_file.filename == '':
        return jsonify({'error': 'No selected test file'})

    try:
        test_content = test_file.read()
        
        # Store test file in the database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO assignments (test_filename, test_content) VALUES (%s, %s)",
                       (test_file.filename, test_content))
        mysql_connection.commit()
        cursor.close()

        return jsonify({'message': 'Test file uploaded successfully'})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)})


@app.route('/submit-assignment/<int:assignment_id>', methods=['POST'])
def submit_assignment(assignment_id):
    if 'sqlFile' not in request.files:
        return jsonify({'error': 'No SQL file part'})

    sql_file = request.files['sqlFile']

    if sql_file.filename == '':
        return jsonify({'error': 'No selected SQL file'})

    try:
        # Fetch the test file for the given assignment_id
        cursor = mysql_connection.cursor()
        cursor.execute("SELECT test_content FROM assignments WHERE id = %s", (assignment_id,))
        row = cursor.fetchone()
        if not row:
            return jsonify({'error': 'Assignment not found'})

        test_content = row[0]

        sql_content = sql_file.read()

        # Save the SQL submission to the database
        cursor.execute("INSERT INTO files (assignment_id, filename, file_content) VALUES (%s, %s, %s)",
                       (assignment_id, sql_file.filename, sql_content))
        mysql_connection.commit()
        
        submission_id = cursor.lastrowid
        cursor.close()

        # Save the test content to a temporary file
        test_filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'temp_test_file.py')
        with open(test_filepath, 'wb') as f:
            f.write(test_content)

        # Dynamically load the test module
        test_module = load_test_module(test_filepath)

        # Decode the SQL content and run the tests
        uploaded_query = sql_content.decode('utf-8')
        test_results = run_test_suite(uploaded_query, mysql_connection, test_module)

        # Extract information from the test results
        passed_tests = sum(1 for test_result in test_results if test_result['status'] == 'passed')
        failed_tests = sum(1 for test_result in test_results if test_result['status'] == 'failed')
        total_tests = passed_tests + failed_tests

        # Calculate the percentage of passed tests
        percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0
        total_points = 5 * total_tests
        points_obtained = 5 * passed_tests

        # Update the submission with the test results
        cursor = mysql_connection.cursor()
        cursor.execute("""
            UPDATE files
            SET grade_percentage = %s, points_obtained = %s, total_points = %s
            WHERE id = %s
        """, (percentage_passed, points_obtained, total_points, submission_id))
        mysql_connection.commit()
        cursor.close()

        test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
                              f"Score: {points_obtained}/{total_points}"

        print(test_result_message)

        # Return response with percentage passed, failures, and test results
        return jsonify({
            'percentage_passed': percentage_passed,
            'failures': failed_tests,
            'points_obtained': points_obtained,
            'total_points': total_points,
            'test_results': test_results
        })
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)})

    
if __name__ == '__main__':
    app.run(debug=True)