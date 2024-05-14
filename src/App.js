import { useState } from 'react';
import './App.css';

import DropFileInput from './component/drop-file-input/DropFileInput.jsx';

//firebase
function App() {

    const onFileChange = (files) => {

        console.log(files);
    }



    return (
        <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}/>
        </div>
    );
}

export default App;