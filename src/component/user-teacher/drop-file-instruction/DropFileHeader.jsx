import { Typography } from "@mui/material";
import React from "react";

function DropFileHeader() {
    return (
        <div id="assignment-header" className="assignment-header">
            <Typography variant="h1" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                Upload Assignment
            </Typography>
        </div>
    );
}

export default DropFileHeader;
