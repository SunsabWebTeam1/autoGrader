import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import '../../../styling/drop-file-input.css';

import { Box, Button, LinearProgress, Typography } from '@mui/material';
import initialDropFileInstructions from '../../../assets/SubmitFileInstructions-int-teacher.png';
import DropFileInstructions from '../../../assets/SubmitFileInstructions-teacher.png';
import { ImageConfig } from '../../../config/ImageConfig';
import { storage } from '../../../firebase';

//firebaseStuff
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const DropTestInstruction = props => {


    const [fileList, setFileList] = useState([]);
    const [progress, setProgress] = useState(0)

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
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
        fileList.forEach(uploadFiles);
    };

    const uploadFiles = (file) => {
        //
        if(!file) return;
        const storageRef = ref(storage,  `/download/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100)

          setProgress(prog);
        }, (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then(url => console.log(url))
        }
        );
      };
      //seperate files
      
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
                    <img src={fileList.length > 0 ? DropFileInstructions : initialDropFileInstructions} alt="Upload Instructions" />
                </div>
                <input type="file" onChange={onFileDrop} />
                
            </div>
            {fileList.length > 0 ? (
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
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <LinearProgress 
                                variant="determinate"
                                value={progress} 
                                sx={{
                                    '& .MuiLinearProgress-barColorPrimary': {
                                        backgroundColor: '#6C6CB5', // Change the progress color
                                    },
                                    '& .MuiLinearProgress-colorPrimary': {
                                        backgroundColor: '#D3D3D3', // Change the buffer color
                                    },
                            }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Uploaded {progress}%
                        </Typography>
                        <Button 
                            className="drop-file-preview__title" 
                            onClick={startUpload}
                            variant="contained" 
                            style={{
                                backgroundColor: '#00989B', 
                                color: 'white', 
                                width: '50vh',  
                                height: '7vh', 
                                borderRadius: '10px',
                                marginTop: '5%',
                                fontFamily: 'Montserrat, sans-serif'
                        }}
                        >
                            Ready to upload
                        </Button>

                    </div>
                ) : null
            }
        </>
    );
}

DropTestInstruction.propTypes = {
    onFileChange: PropTypes.func
}

export default DropTestInstruction;

//teacher 