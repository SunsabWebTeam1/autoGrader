import { Typography } from "@mui/material";
import React from "react";

function SubmitFileHeader() {
    return (
        <div id="submit-assignment-header" className="submit-assignment-header">
            <Typography variant="h1" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                Lab: Simple SELECT and Sorting Data
            </Typography>
        </div>
    );
}

export default SubmitFileHeader;
