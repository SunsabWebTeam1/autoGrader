import React from 'react';
import { useState } from 'react';
import DropFileInput from './DropFileInput.jsx';

const AddFile = () => {
    const onFileChange = (files) => {
        console.log(files);
    };

    return (
        <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput onFileChange={(files) => onFileChange(files)} />
        </div>
    );
};

export default AddFile;
