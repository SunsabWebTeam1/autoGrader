/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
//Objects
import DropFileInput from './DropFileInput.jsx';
import ProjectDetails from './ProjectDetails.jsx';
import DownloadFile from './DownloadFile.jsx';
import '../../../styling/studentAssignmentLayout.css'
//IconsImport
import infoICON from '../../../assets/icons/Info.png';
import instructionICON from '../../../assets/icons/Instruction.png';
import DonwloadICON from '../../../assets/icons/Download.png';
import SubmisionICON from '../../../assets/icons/Submision.png';

//material UI
import { Button } from '@mui/material';
const AddFile = () => {
    const [currentContent, setCurrentContent] = useState('ProjectDetails');

    const handleNextClick = () => {
        switch (currentContent) {
            case 'ProjectDetails':
                setCurrentContent('DownloadFile');
                break;
            case 'DownloadFile':
                setCurrentContent('DropFileInput');
                break;
            // Add case for further navigation if needed
            default:
                break;
        }
    };
    const handleSidebarClick = (content) => {
        setCurrentContent(content);
    };

    const renderMainContent = () => {
        switch (currentContent) {
            case 'ProjectDetails':
                return <ProjectDetails />;
            case 'DropFileInput':
                return <DropFileInput onFileChange={(files) => onFileChange(files)} />;
            case 'DownloadFile':
                    return <DownloadFile />;
            // Add cases for other content here if needed
            default:
                return null;
        }
    };

    const onFileChange = (files) => {
        console.log(files);
    };

    const renderSubNavBarContent = () => {
        switch (currentContent) {
            case 'ProjectDetails':
                return 'Project Details';
            case 'DropFileInput':
                return 'Submission';
            case 'DownloadFile':
                return 'Download';
            // Add cases for other content here if needed
            default:
                return 'Submission';
        }
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
                    <div className='MainLayout'>
                        <div className='bodyforDropFile'>
                            <div>
                                {renderMainContent()}
                            </div>
                        </div>
                    </div>
                    <div className='Submit-NextLayout'>
                        <Button variant="contained" onClick={handleNextClick}>Next</Button>
                    </div>
                </div>
                <div id="subNavBar" className='subNavBarLayout'>
                    <div className='subNavBarContent'>
                        <div className='subNavBarContentInfo'>{renderSubNavBarContent()}</div>
                    </div>
                </div>
                <div id="sideBar" className='sideBarLayout'>
                    <div className='sideBarContent'>
                        <hr className='sideBarContentHR'/>
                        <div className='sideBarDetails' onClick={() => handleSidebarClick('ProjectDetails')}>
                            <div className='sideBarDetailsINDI'>
                                <img src={infoICON}/> 
                                Project Details
                            </div>
                        </div>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI'>
                                <img src={instructionICON}/> 
                                Instruction
                            </div>
                        </div>
                        <div className='sideBarDetails'>
                            <div className='sideBarDetailsINDI' onClick={() => handleSidebarClick('DownloadFile')}>
                                <img src={DonwloadICON}/> 
                                Download
                            </div>
                        </div>
                        <hr className='sideBarContentHR'/>
                        <div className='sideBarDetails' onClick={() => handleSidebarClick('DropFileInput')}>
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