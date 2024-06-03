import { Button, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { addAssignment } from "../../../services/AssignmentsService";

function CreateAssignmentPage() {
    const [title, setTitle] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [dateDue, setDateDue] = useState(null);
    const { user } = UserAuth();

    const handleProceed = async (event) => {
        event.preventDefault();
        if (user) {
            try {
                const teacherId = user.uid;
    
                const assignment = {
                    title,
                    assignmentDescription,
                    dateDue: dateDue ? dateDue.format("YYYY-MM-DD") : null,
                };
    
                console.log("Assignment to be added:", assignment);
                console.log("Teacher ID:", teacherId);
    
                await addAssignment(teacherId, assignment);
                console.log(`Assignment ${assignment.title} created`);
                
            } catch (error) {
                console.error("Error creating assignment:", error);
            }
        }
    };
    return (
        <div className="App">
            <div className="content">
                <Typography component="div" variant="h5" className="title">
                    Title
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    sx={{ mt: 2, mb: 1, width: "100%" }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Typography component="div" variant="h5" className="Assignment-Description">
                    Assignment Description
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Assignment Description"
                    variant="outlined"
                    sx={{ mt: 2, mb: 1, width: "100%" }}
                    value={assignmentDescription}
                    onChange={(e) => setAssignmentDescription(e.target.value)}
                />
                <Typography component="div" variant="h5" className="Date-Due">
                    Date Due
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date Due"
                        value={dateDue}
                        onChange={(newValue) => setDateDue(newValue)}
                        sx={{ mt: 2, mb: 1, width: "100%" }}
                        renderInput={(params) => <TextField {...params} sx={{ mt: 2, mb: 1, width: "100%" }} />}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "#00989B",
                        color: "white",
                        marginTop: "5%",
                        width: "25%",
                        height: "7vh",
                        borderRadius: '10px',
                    }}
                    onClick={handleProceed}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
}

export default CreateAssignmentPage;
