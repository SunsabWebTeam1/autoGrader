import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React from 'react';
import GetFile from '../../../assets/DownloadAssignment-student.png';
import { storage } from '../../../firebase';
const DownloadFile = () => {

    const downloadFile = async () => {
        const storageRef = ref(storage, `/download`);
        const listResult = await listAll(storageRef);
        if (listResult.items.length === 0) {
            alert("No files found in storage");
            return;
        }
        const firstFileRef = listResult.items[0];
        const downloadUrl = await getDownloadURL(firstFileRef);
        window.open(downloadUrl);
    };

    return (
        <div class="center-container">
            <div class="add-file-download">
                <img src={GetFile} alt="" onClick={downloadFile}/>
            </div>
        </div>
    )
}

export default DownloadFile