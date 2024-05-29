from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

from appForPython import upload_file_Python, generate_test_results
from appForSQL import upload_file_sql, generate_test_results

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

        if filename.endswith('.py'):
            # Call function from appForPython
            test_results = upload_file_Python(filename, content)
            return jsonify({'test_results': test_results})
        elif filename.endswith('.sql'):
            # Handle SQL file logic here
            test_results = upload_file_sql(filename, content)
            return jsonify({'test_results': test_results})
        else:
            return jsonify({'error': 'Unsupported file type'})


    except Exception as e:
        return jsonify({'error': str(e)})
    
    

if __name__ == '__main__':
    app.run(debug=True)