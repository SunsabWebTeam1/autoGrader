from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
import uuid
import unittest
import importlib.util
from google.cloud.sql.connector import Connector
import pymysql
import sqlalchemy

app = Flask(__name__, static_folder="../build", static_url_path='/')
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'  # Replace with your actual upload folder path
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize the Cloud SQL Python Connector
connector = Connector()

# Function to return the database connection
def getconn():
    conn = connector.connect(
        "bamboo-basis-426622-u5:us-west1:sunsab-autograder",
        "pymysql",
        user="root",
        password="E=a0YXV8qp,V0sr{",
        db="file_storage"
    )
    return conn

# create SQLAlchemy connection pool
pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

def run_test_suite(unit_test_path, uploaded_module, pool):
    spec = importlib.util.spec_from_file_location("unit_test_module", unit_test_path)
    unit_test_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(unit_test_module)
    
    test_suite_instance = unit_test_module.test_suite(uploaded_module,pool)
    # Run the test suite
    test_runner = unittest.TextTestRunner()
    test_suite_result = test_runner.run(test_suite_instance)

    # Load test cases from the test suite
    suite = unit_test_module.test_suite(uploaded_module, pool)
    # Generate test results
    test_results = generate_test_results(suite, test_suite_result)
    
    return test_results

def generate_test_results(suite, test_suite_result):
    test_results = []

    # Collect all test case names from the suite
    test_case_names = {test_case.id().split('.')[-1]: test_case for test_case in suite._tests if test_case is not None}

    # Process errors
    for test_error, traceback in test_suite_result.errors:
        test_case_name = test_error.id().split('.')[-1]
        if test_case_name in test_case_names:
            failure_message = str(traceback)
            test_results.append({
                'name': test_case_name,
                'score': '0/5',
                'failure_message': failure_message,
                'status': 'failed'
            })
            print(f"{test_case_name} = 0/5")
            # Remove processed test case from the dictionary
            del test_case_names[test_case_name]

    # Process failures
    for test_failure, traceback in test_suite_result.failures:
        test_case_name = test_failure.id().split('.')[-1]
        if test_case_name in test_case_names:
            failure_message = str(traceback)
            test_results.append({
                'name': test_case_name,
                'score': '0/5',
                'failure_message': failure_message,
                'status': 'failed'
            })
            print(f"{test_case_name} = 0/5")
            # Remove processed test case from the dictionary
            del test_case_names[test_case_name]

    # Process passed tests
    for test_case_name, test_case in test_case_names.items():
        test_results.append({
            'name': test_case_name,
            'score': '5/5',
            'status': 'passed'
        })
        print(f"{test_case_name} = 5/5")

    return test_results

def save_file_to_db(filename, size, content, grade_percentage):
    with pool.connect() as conn:
        query = sqlalchemy.text("""
        INSERT INTO Files (filename, size, content, grade_percentage)
        VALUES (:filename, :size, :content, :grade_percentage)
        """)
        conn.execute(query, {
            'filename': filename,
            'size': size,
            'content': content,
            'grade_percentage': grade_percentage
        })
        conn.commit()


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/upload_unit_test', methods=['POST'])
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

@app.route('/api/upload_submission', methods=['POST'])
def upload_file_sql():
    if 'file' not in request.files or 'unit_test_id' not in request.form:
        return jsonify({'error': 'Invalid request'}), 400

    file = request.files['file']
    unit_test_id = request.form['unit_test_id']

    unit_test_path = os.path.join(UPLOAD_FOLDER, f"{unit_test_id}_unit_test.py")
    if not os.path.exists(unit_test_path):
        return jsonify({'error': 'Unit test file not found'}), 404

    try:
        content = file.read().decode('utf-8').strip()
        uploaded_queries = [query.strip() for query in content.split(';') if query.strip()]

        all_query_results = []
        conn = getconn()

        for query in uploaded_queries:
            cursor = conn.cursor()
            try:
                cursor.execute(query)
                result = cursor.fetchall()
                all_query_results.append({'query': query, 'result': result})
            except Exception as e:
                all_query_results.append({'query': query, 'result': str(e)})
            finally:
                cursor.close()  # Ensure cursor is closed after each query

        # Run the tests for all queries
        test_results = run_test_suite(unit_test_path, uploaded_queries, pool)

        # Calculate overall test results
        passed_tests = sum(1 for test_result in test_results if test_result['status'] == 'passed')
        failed_tests = sum(1 for test_result in test_results if test_result['status'] == 'failed')
        total_tests = passed_tests + failed_tests

        percentage_passed = (passed_tests / total_tests) * 100 if total_tests != 0 else 0
        percentage_passed = round(percentage_passed, 2)

        total_points = 5 * total_tests
        points_obtained = 5 * passed_tests

        # Save file and test results to the database
        save_file_to_db(file.filename, len(content), content, percentage_passed)

        test_result_message = f"{percentage_passed}% of tests passed. {failed_tests} tests failed. " \
                              f"Score: {points_obtained}/{total_points}"

        print(test_result_message)

        # Return response with percentage passed, failures, and test results
        return jsonify({
            'percentage_passed': percentage_passed,
            'failures': failed_tests,
            'points_obtained': points_obtained,
            'total_points': total_points,
            'test_results': test_results,
            'query_results': all_query_results  # Include query execution results
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)})
    
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)