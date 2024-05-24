import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import '../../styling/drop-file-input.css';

import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';
import { storage } from '../../firebase';

//firebaseStuff
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [progress, setProgress] = useState(0); // Initialize progress state
    const [failures, setFailures] = useState(0); // Initialize progress state
    const [testResults, setTestResults] = useState([]); // Initialize test results state

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            // Reset test results when a new file is dropped
            setTestResults([]);
            
            setFailures(0);
            setProgress(0);
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }   

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    
    const startUpload = () => {
        fileList.forEach(uploadFile);
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('Response from server:', data);
    
            setProgress(data.percentage_passed || 0);
            setFailures(data.failures || 0);
            setTestResults(data.test_results || []); 
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    
    return (
        <>
           <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                        <button className="drop-file-preview__title" onClick={startUpload}>
                            Ready to upload
                        </button>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p>Test pass percentage: {progress}%</p>
                        <p>Failures: {failures}</p>
                        {
                            testResults.length > 0 && (
                                <div>
                                    <p>Test Results:</p>
                                    <ul>
                                        {testResults.map((test, index) => (
                                            <li key={index}>{test.name} = {test.score}</li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;