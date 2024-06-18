/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
//Objects
import '../../../styling/studentAssignmentLayout.css';
import DownloadFile from './DownloadFile.jsx';
import DropFileInput from './DropFileInput.jsx';
import ProjectDetails from './ProjectDetails.jsx';
//IconsImport
import DonwloadICON from '../../../assets/icons/Download.png';
import infoICON from '../../../assets/icons/Info.png';
import SubmisionICON from '../../../assets/icons/Submision.png';

//material UI
import { Button, Fade } from '@mui/material';
import SubmitFileHeader from './SubmitFileHeader.jsx';

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
                return 'Download Content';
            // Add cases for other content here if needed
            default:
                return 'Submission';
        }
    };

    return (
        <Fade in={true} timeout={1000}>
            <div className='App'>
                <SubmitFileHeader/>
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
                                {currentContent !== 'DropFileInput' && (
                                        <Button 
                                            variant="contained" 
                                            onClick={handleNextClick} 
                                            style={{ 
                                                backgroundColor: '#00989B', 
                                                color: 'white', 
                                                width: '25%', 
                                                height: '7vh', 
                                                borderRadius: '10px', 
                                                fontFamily: 'Montserrat, sans-serif'
                                            }}
                                        >
                                            Next
                                        </Button>
                                )}
                            </div>
                        </div>
                        <div id="subNavBar" className='subNavBarLayout'>
                            <div className='subNavBarContent2'>
                                <div className='subNavBarContentInfo'>{renderSubNavBarContent()}</div>
                            </div>
                        </div>
                        <div id="sideBar" className='sideBarLayout'>
                            <div className='sideBarContent2'>
                                <hr className='sideBarContentHR'/>
                                <div className='sideBarDetails' onClick={() => handleSidebarClick('ProjectDetails')}>
                                    <div className='sideBarDetailsINDI'>
                                        <img src={infoICON}/> 
                                        Project Details
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
            </div>
        </Fade>

    );
};

export default AddFile;
