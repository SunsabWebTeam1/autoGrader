import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import '../../../styling/drop-file-input.css';

import DropFileInstructions from '../../../assets/SubmitFileInstructions-teacher.png';
import { ImageConfig } from '../../../config/ImageConfig';
import { storage } from '../../../firebase';

//firebaseStuff
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const DropTestInstruction = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [progress, setProgress] = useState()

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
                    <img src={DropFileInstructions} alt="" />
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
                
            </div>
            {
                fileList.length > 0 ? (
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
                        <button className="drop-file-preview__title" onClick={startUpload}>
                            Ready to upload
                        </button>
                        <h2 className="header">
                            Uploaded {progress}%
                        </h2>
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