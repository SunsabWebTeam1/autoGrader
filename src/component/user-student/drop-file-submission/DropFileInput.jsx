import axios from "axios";
import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PropTypes from "prop-types";
import uploadImg from "../../../assets/SubmitAssignment-student.png";
import { ImageConfig } from "../../../config/ImageConfig";

import { TextField } from "@mui/material";
import "../../../styling/drop-file-input.css";
import "../../../styling/studentAssignmentLayout.css";

const SubmissionUpload = (props) => {
  const [submissionFile, setSubmissionFile] = useState(null);
  const [searchParams] = useSearchParams();
  const [testResults, setTestResults] = useState([]);
  const [manualUnitTestId, setManualUnitTestId] = useState("");
  const urlUnitTestId = searchParams.get("unit_test_id");

  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [failures, setFailures] = useState(0);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setTestResults([]);
      setFailures(0);
      setProgress(0);
      setFileList([newFile]);
      setSubmissionFile(newFile);
      props.onFileChange([newFile]);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    setSubmissionFile(null);
    props.onFileChange(updatedList);
  };

  const handleSubmissionUpload = async () => {
    const unitTestId = manualUnitTestId || urlUnitTestId;

    if (!unitTestId) {
      alert("Please enter a Unit Test ID");
      return;
    }

    if (!submissionFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", submissionFile);
    formData.append("unit_test_id", unitTestId);

    try {
      const response = await axios.post(
        "https://autograder-app-flask-yac6pd5bwq-uw.a.run.app/api/upload_submission",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = response.data;
      if (data.error) {
        console.error(data.error);
        alert(data.error);
        return;
      }

      const testResultsData = data.test_results || [];

      setProgress(data.percentage_passed || 0);
      setFailures(data.failures || 0);
      setTestResults(testResultsData);

      alert("Submission file uploaded and tested successfully");
    } catch (error) {
      console.error("Error uploading submission file:", error);
    }
  };

  const generateSummary = () => {
    const percentagePassed = progress;
    const failedTests = failures;
    const totalTests = testResults.length;
    const passedTests = totalTests - failedTests;
    const pointsObtained = passedTests * 5;
    const totalPoints = totalTests * 5;

    const testResultMessage =
      `${percentagePassed}% of tests passed. ${failedTests} tests failed. ` +
      `Score: ${pointsObtained}/${totalPoints}`;

    return testResultMessage;
  };

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
          <img src={uploadImg} alt="" />
        </div>
        <input type="file" onChange={onFileDrop} />
      </div>
      <TextField
        id="outlined-basic"
        label="Enter Unit Test ID"
        variant="outlined"
        sx={{ mt: 2, mb: 1, width: "100%", marginTop: "30%" }}
        type="text"
        value={manualUnitTestId}
        onChange={(e) => setManualUnitTestId(e.target.value)}
      />
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
          <button
            className="drop-file-preview__title"
            onClick={handleSubmissionUpload}
          >
            Ready to upload
          </button>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>Test pass percentage: {progress}%</p>
          <p>Failures: {failures}</p>
          {testResults.length > 0 && (
            <div>
              <p>Test Results:</p>
              <ul>
                {testResults.map((test, index) => (
                  <li key={index}>
                    {test.name} = {test.status === "passed" ? "5/5" : "0/5"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="test-summary">
            <p>{generateSummary()}</p>
          </div>
        </div>
      )}
    </>
  );
};

SubmissionUpload.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default SubmissionUpload;
