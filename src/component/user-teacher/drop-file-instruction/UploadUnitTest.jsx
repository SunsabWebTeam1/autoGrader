import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UnitTestUpload() {
    const [unitTestFile, setUnitTestFile] = useState(null);
    const navigate = useNavigate();

    const handleUnitTestFileChange = (e) => {
        setUnitTestFile(e.target.files[0]);
      };
    
      const handleUnitTestUpload = async () => {
        const formData = new FormData();
        formData.append('file', unitTestFile);

        try {
            const response = await axios.post('http://localhost:5000/upload_unit_test', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Unit test file uploaded successfully');
            navigate(`/submission?unit_test_id=${response.data.unit_test_id}`);
          } catch (error) {
            console.error('Error uploading unit test file:', error);
          }
        };

    return (
        <div className='bodyforDropFile'>
            <div className="box">
                <h2>Upload Unit Test File</h2>
                <input type="file" onChange={handleUnitTestFileChange} />
            </div>
            <button onClick={handleUnitTestUpload}>Upload Unit Test</button>
        </div>
    );
};

export default UnitTestUpload;