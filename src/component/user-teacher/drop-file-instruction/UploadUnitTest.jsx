import React, { useState } from 'react';
import axios from 'axios';

function UnitTestUpload() {
    const [unitTestFile, setUnitTestFile] = useState(null);
    const [unitTestId, setUnitTestId] = useState(null);

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
            setUnitTestId(response.data.unit_test_id);
            alert('Unit test file uploaded successfully');
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
            <div>{unitTestId && <p>Unit Test ID: {unitTestId}</p>}</div>
        </div>
    );
};

export default UnitTestUpload;