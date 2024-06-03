import React from 'react';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { Button } from '@mui/material';
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
        <Button variant="contained" onClick={downloadFile}>Contained</Button>
    )
}

export default DownloadFile