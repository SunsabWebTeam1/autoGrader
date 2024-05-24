from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import unittest
import importlib.util
import io

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

def generate_test_results(suite, test_result):
    passed_test_results = []
    failed_test_results = []

    # Record failed test cases
    for test_case, test_failure in zip(suite, test_result.failures):
        test_case_name = test_case.id().split('.')[-1]
        failed_test_results.append({'name': test_case_name, 'score': '0/5', 'failure_message': str(test_failure[1]), 'status': 'failed'})
        print(f"{test_case_name} = 0/5")

    # Record passed test cases
    for test_case in suite:
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

        # Store the content of the uploaded file in memory
        uploaded_module_content = io.BytesIO(content)

        # Load test cases from existing file
        from Python.UnitTest3 import test_suite

        # Import the uploaded module dynamically
        spec = importlib.util.spec_from_loader(filename, loader=None)
        uploaded_module = importlib.util.module_from_spec(spec)
        exec(uploaded_module_content.getvalue(), uploaded_module.__dict__)

        # Run the tests
        test_result = unittest.TextTestRunner().run(test_suite(uploaded_module))

        # Get the total number of tests and the number of passed tests
        total_tests = test_result.testsRun
        passed_tests = total_tests - len(test_result.failures) - len(test_result.errors)
        failed_tests = len(test_result.failures)

        # Calculate the percentage of passed tests
        percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0

        # Calculate points based on percentage
        total_points = 5 * total_tests
        points_obtained = 5 * passed_tests

        # Save file and test results to database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
                       (filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
                              f"Score: {points_obtained}/{total_points}"
    
        print(test_result_message)

         # Load test cases from the test suite
        suite = test_suite(None)

        # Generate test results
        test_results = generate_test_results(suite, test_result)


        return jsonify({'percentage_passed': percentage_passed, 'failures': failed_tests,
                'points_obtained': points_obtained, 'total_points': total_points,
                'test_results': test_results})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
    

if __name__ == '__main__':
    app.run(debug=True)