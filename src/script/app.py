from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import unittest
import importlib.util
import io
import sys

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MySQL connection
mysql_connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='file_storage'
)

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
        from UnitTest import test_suite

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

        # Save file and test results to database
        cursor = mysql_connection.cursor()
        cursor.execute("INSERT INTO files (filename, size, content, grade_percentage) VALUES (%s, %s, %s, %s)",
                       (filename, size, content, percentage_passed))
        mysql_connection.commit()
        cursor.close()

        print(percentage_passed)

        return jsonify({'percentage_passed': percentage_passed, 'failures': failed_tests})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)