import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import DropUnitTest from "../../../assets/SubmitTestFile-teacher.png";

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
        <div className="bodyforDropFile">
            <div className="drop-file-container">
                <div className="drop-file-input">
                    <div className="drop-file-input__label">
                        <img src={DropUnitTest} alt="Upload Unit Test" />
                        <input type="file" onChange={handleUnitTestFileChange} />
                    </div>
                </div>

                <Button
                    variant="contained" 
                    onClick={handleUnitTestUpload}
                    style={{
                        backgroundColor: '#00989B', 
                        color: 'white', 
                        width: '50vh',  
                        height: '7vh', 
                        borderRadius: '10px',
                        marginTop: '30%' 
                    }}
                >
                    Upload Unit Test
                </Button>
            </div>

            {unitTestId && <div><p>Unit Test ID: {unitTestId}</p></div>}
        </div>
    );
}

export default UnitTestUpload;
