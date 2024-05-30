import React from 'react';
import DropFileInput from './DropFileInput.jsx';

const AddFile = () => {
    const onFileChange = (files) => {
        console.log(files);
    };

    return (
        <div className='bodyforDropFile'>
            <div className="box">
                <h2 className="header">
                    React drop files input
                </h2>
                <DropFileInput onFileChange={(files) => onFileChange(files)} />
            </div>
        </div>
    );
};

export default AddFile;
//student