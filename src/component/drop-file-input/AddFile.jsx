import React, { useState } from "react";
import DropFileInput from "./DropFileInput.jsx";

const AddFile = () => {
  const [assignmentId, setAssignmentId] = useState("");

  const onAssignmentFileChange = (files) => {
    console.log("Assignment files:", files);
    // Handle assignment file upload
    const formData = new FormData();
    formData.append("testFile", files[0]);

    fetch("http://localhost:5000/upload-assignment", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Assignment upload response:", data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error uploading assignment file:", error);
      });
  };

  const onSubmissionFileChange = (files) => {
    console.log("Submission files:", files);
    // Handle submission file upload with assignment ID
    const formData = new FormData();
    formData.append("sqlFile", files[0]);

    fetch(`http://localhost:5000/submit-assignment/${assignmentId}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Submission upload response:", data);
        alert(
          `Test pass percentage: ${data.percentage_passed}%\nFailures: ${data.failures}`
        );
      })
      .catch((error) => {
        console.error("Error uploading submission file:", error);
      });
  };

  return (
    <div className="bodyforDropFile">
      <div className="box">
        <h2 className="header">Upload New Assignment (Unit Test)</h2>
        <DropFileInput onFileChange={onAssignmentFileChange} />

        <h2 className="header">Submit Assignment</h2>
        <input
          type="text"
          placeholder="Enter Assignment ID"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
        />
        <DropFileInput onFileChange={onSubmissionFileChange} />
      </div>
    </div>
  );
};

export default AddFile;
