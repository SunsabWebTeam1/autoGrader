import { Input } from "@mui/material";
import React, { useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { addStudentToAssignment } from "../../../services/AssignmentsService";
import "../../../styling/student-pages.css";
function AddAssignment() {
    const { user } = UserAuth();
    const [assignmentId, setAssignmentId] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user) {
            try {
                const studentId = user.uid;
                await addStudentToAssignment(assignmentId, studentId);
                setMessage("Successfully added to the assignment.");
            } catch (error) {
                console.error("Error adding student to assignment:", error);
                setMessage("Failed to add to the assignment.");
            }
        } else {
            setMessage("User not authenticated.");
        }
    };

    return (
        <div className="App">
            <div className="content">
                <h1>Add Assignment</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Assignment ID:
                        <Input 
                            type="text" 
                            value={assignmentId} 
                            onChange={(e) => setAssignmentId(e.target.value)} 
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default AddAssignment;
