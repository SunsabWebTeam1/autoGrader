from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

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

    filename = file.filename
    content = file.read()
    size = len(content)

    # Save file to database
    cursor = mysql_connection.cursor()
    cursor.execute("INSERT INTO files (filename, size, content) VALUES (%s, %s, %s)", (filename, size, content))
    mysql_connection.commit()
    cursor.close()
    
    # Decode bytes to string
    decoded_content = content.decode('utf-8', errors='ignore')  # Ignore encoding errors

    # Extract and log the first word
    first_word = decoded_content.split()[0] if decoded_content.strip() else None
    print("First word of file:", first_word)

    return jsonify({'message': 'File uploaded successfully', 'first_word': first_word})
if __name__ == '__main__':
    app.run(debug=True)