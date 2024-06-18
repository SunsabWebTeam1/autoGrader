/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
//Objects
import DropFileHeader from './DropFileHeader';
import DropTestInstruction from './DropTestInstruction';
import ProjectDetails from './ProjectDetails';
import UnitTestUpload from './UploadUnitTest';

import '../../../styling/teacherAssignmentLayout.css';
//IconsImport
import DonwloadICON from '../../../assets/icons/Download.png';
import infoICON from '../../../assets/icons/Info.png';
import SubmisionICON from '../../../assets/icons/Submision.png';

//material UI
import { Button, Fade } from '@mui/material';

const DropFile = () => {
    const [currentContent, setCurrentContent] = useState('ProjectDetails');

    const handleNextClick = () => {
        switch (currentContent) {
            case 'ProjectDetails':
                setCurrentContent('UnitTestUpload');
                break;
            case 'UnitTestUpload':
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
                return 'Tutorial';
            case 'UnitTestUpload':
                return 'Unit Test Upload';
            case 'DropTestInstruction':
                return 'Drop Test Instruction';
            // Add cases for other content here if needed
            default:
                return 'Submission';
        }
    };

    return (
        <div className="App">
            <DropFileHeader />
            <div className='flexContainer'>
                <div className='container'>
                    <div id="main">
                        <div className='MainLayout'>
                            <div className='bodyforDropFile'>
                                <Fade in={true} key={currentContent} timeout={500}>
                                    <div>
                                        {renderMainContent()}
                                    </div>
                                </Fade>
                            </div>
                        </div>
                        <div className='Submit-NextLayout'>
                            {currentContent !== 'DropTestInstruction' && (
                                <Button 
                                    variant="contained" 
                                    onClick={handleNextClick} 
                                    style={{ 
                                        backgroundColor: '#00989B', 
                                        color: 'white', 
                                        width: '25%', 
                                        height: '7vh', 
                                        borderRadius: '10px' 
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                    <div id="subNavBar" className='subNavBarLayout'>
                        <div className='subNavBarContent'>
                            <div className='subNavBarContentInfo'>{renderSubNavBarContent()}</div>
                        </div>
                    </div>
                    <div id="sideBar" className='sideBarLayout'>
                        <div className='sideBarContent'>
                            <hr className='sideBarContentHR' />
                            <div className='sideBarDetails' onClick={() => handleSidebarClick('ProjectDetails')}>
                                <div className='sideBarDetailsINDI'>
                                    <img src={infoICON} /> 
                                    Tutorial
                                </div>
                            </div>
                            <div className='sideBarDetails'>
                                <div className='sideBarDetailsINDI' onClick={() => handleSidebarClick('UnitTestUpload')}>
                                    <img src={DonwloadICON} /> 
                                    DropUniTest
                                </div>
                            </div>
                            <div className='sideBarDetails' onClick={() => handleSidebarClick('DropTestInstruction')}>
                                <div className='sideBarDetailsINDI'>
                                    <img src={SubmisionICON} /> 
                                    DropTestInstruction
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropFile;
