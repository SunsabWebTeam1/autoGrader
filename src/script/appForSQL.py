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
def run_test_suite(uploaded_module):
    # Load test cases from existing file
    from SQL.RunTestCase2Count import test_suite
    
    # Run the tests
    test_suite_result = unittest.TextTestRunner().run(test_suite(uploaded_module))
    return test_suite_result

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

        # Run the tests
        test_suite_result = run_test_suite(uploaded_query)

        # Get the total number of tests and the number of passed tests
        total_tests = test_suite_result.testsRun
        passed_tests = total_tests - len(test_suite_result.failures) - len(test_suite_result.errors)
        failed_tests = len(test_suite_result.failures)

        # Calculate the percentage of passed tests
        percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0

        # Save file and test results to the database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
                       (filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        # Return success response with the query result and test percentage
        return jsonify({'result': result, 'percentage_passed': percentage_passed})
    except Exception as e:
        # Print out any exceptions that occur for debugging
        print("Error:", str(e))
        return jsonify({'error': str(e)})
    
if __name__ == '__main__':
    app.run(debug=True)