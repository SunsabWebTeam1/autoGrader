import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function SubmissionUpload() {
  const [submissionFile, setSubmissionFile] = useState(null);
  const [searchParams] = useSearchParams();
  const [testResults, setTestResults] = useState(null);
  const [manualUnitTestId, setManualUnitTestId] = useState(""); // New state for manual Unit Test ID
  const urlUnitTestId = searchParams.get("unit_test_id");

  const handleSubmissionFileChange = (e) => {
    setSubmissionFile(e.target.files[0]);
  };

  const handleSubmissionUpload = async () => {
    const unitTestId = manualUnitTestId || urlUnitTestId; // Use manual Unit Test ID if provided, otherwise fall back to URL parameter

    if (!unitTestId) {
      alert("Please enter a Unit Test ID");
      return;
    }

    const formData = new FormData();
    formData.append("file", submissionFile);
    formData.append("unit_test_id", unitTestId);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload_submission",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTestResults(response.data);
      alert("Submission file uploaded and tested successfully");
    } catch (error) {
      console.error("Error uploading submission file:", error);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload Submission File</h2>
      <input type="file" onChange={handleSubmissionFileChange} />
      <input
        type="text"
        placeholder="Enter Unit Test ID"
        value={manualUnitTestId}
        onChange={(e) => setManualUnitTestId(e.target.value)}
      />
      <button onClick={handleSubmissionUpload}>Upload Submission</button>
      {testResults && (
        <div className="results-section">
          <h2>Test Results</h2>
          <p>Tests Run: {testResults.testsRun}</p>
          <p>Failures: {testResults.failures}</p>
          <p>Errors: {testResults.errors}</p>
          <p>
            Grade Percentage:{" "}
            {testResults.grade_percentage !== undefined
              ? testResults.grade_percentage.toFixed(2)
              : "N/A"}
            %
          </p>
          <h3>Failures Details:</h3>
          <pre>{testResults.failures_list.join("\n")}</pre>
          <h3>Errors Details:</h3>
          <pre>{testResults.errors_list.join("\n")}</pre>
        </div>
      )}
    </div>
  );
}

export default SubmissionUpload;
