/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
//Objects
import ProjectDetails from './ProjectDetails';
import DropTestInstruction from './DropTestInstruction';
import UnitTestUpload from './UploadUnitTest';

import './teacherAssignmentLayout.css'
//IconsImport
import infoICON from '../../../assets/icons/Info.png';
import instructionICON from '../../../assets/icons/Instruction.png';
import DonwloadICON from '../../../assets/icons/Download.png';
import SubmisionICON from '../../../assets/icons/Submision.png';

//material UI
import { Button } from '@mui/material';
const DropFile = () => {
    const [currentContent, setCurrentContent] = useState('ProjectDetails');

    const handleNextClick = () => {
        switch (currentContent) {
            case 'ProjectDetails':
                setCurrentContent('DownloadFile');
                break;
            case 'DownloadFile':
                setCurrentContent('DropTestInstruction');
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
            case 'DropTestInstruction':
                return <DropTestInstruction onFileChange={(files) => onFileChange(files)} />;
            case 'UnitTestUpload':
                    return <UnitTestUpload onFileChange={(files) => onFileChange(files)} />;
              
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
            case 'UnitTestUpload':
                return 'UnitTestUpload';;
            case 'DropTestInstruction':
                return 'DropTestInstruction';;
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
                            <div className='sideBarDetailsINDI' onClick={() => handleSidebarClick('UnitTestUpload')}>
                                <img src={DonwloadICON}/> 
                                DropUniTest
                            </div>
                        </div>
                        <hr className='sideBarContentHR'/>
                        <div className='sideBarDetails' onClick={() => handleSidebarClick('DropTestInstruction')}>
                            <div className='sideBarDetailsINDI'>
                                <img src={SubmisionICON}/> 
                                DropTestInstruction
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DropFile;
//teacher 