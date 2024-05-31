/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import DropFileInput from './DropFileInput.jsx';
import './studentAssignmentLayout.css'
//IconsImport
import infoICON from '../../../assets/icons/Info.png';
import instructionICON from '../../../assets/icons/Instruction.png';
import DonwloadICON from '../../../assets/icons/Download.png';
import SubmisionICON from '../../../assets/icons/Submision.png';
const AddFile = () => {
    const onFileChange = (files) => {
        console.log(files);
    };

    return (
        <div className='flexContainer'>
            <div className='container'>
                <div id="navBar" className='NavBarLayout'>
                    <div className='NavBarLayoutContent'>
                        Assigment Title
                    </div>
                </div>
                <div id="main">
                    <div className='bodyforDropFile'>
                        <div>
                            <h2 className="header">
                                React drop files input
                            </h2>
                            <DropFileInput onFileChange={(files) => onFileChange(files)} />
                        </div>
                    </div>
                    <div className='Submit-NextLayout'>
                        <div>Submit</div>
                    </div>
                </div>
                <div id="subNavBar" className='subNavBarLayout'>
                    <div className='subNavBarContent'>
                        <div className='subNavBarContentInfo'>Submission</div>
                    </div>
                </div>
                <div id="sideBar" className='sideBarLayout'>
                    <div className='sideBarContent'>
                        <hr className='sideBarContentHR'/>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI'>
                                <img src={infoICON}/> 
                                Project Details
                            </div>
                        </div>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI'>
                                <img src={instructionICON}/> 
                                Instructions
                            </div>
                        </div>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI'>
                                <img src={DonwloadICON}/> 
                                Download
                            </div>
                        </div>
                        <hr className='sideBarContentHR'/>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI'>
                                <img src={SubmisionICON}/> 
                                Submission
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFile;
//student