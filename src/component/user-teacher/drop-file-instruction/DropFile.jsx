import React from 'react';
import DropTestInstruction from './DropTestInstruction.jsx';
const DropFile = () => {
    const onFileChange = (files) => {
        console.log(files);
    };

    return (
        <div className='bodyforDropFile'>
            <div className="box">
                <h2 className="header">
                    React drop files input
                </h2>
                <DropTestInstruction onFileChange={(files) => onFileChange(files)} />
            </div>
        </div>
    );
};

export default DropFile;
//teacher 