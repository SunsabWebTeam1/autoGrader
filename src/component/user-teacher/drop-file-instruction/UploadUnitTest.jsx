import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import intialDropUnitTest from "../../../assets/SubmitTestFile-int-teacher.png";
import DropUnitTest from "../../../assets/SubmitTestFile-teacher.png";
import { ImageConfig } from "../../../config/ImageConfig";
function UnitTestUpload() {
  const [unitTestFile, setUnitTestFile] = useState(null);
  const [unitTestId, setUnitTestId] = useState(null);

  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleUnitTestFileChange = (e) => {
    setUnitTestFile(e.target.files[0]);
  };

  const handleUnitTestUpload = async () => {
    const formData = new FormData();
    formData.append("file", unitTestFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/upload_unit_test",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUnitTestId(response.data.unit_test_id);
      alert("Unit test file uploaded successfully");
    } catch (error) {
      console.error("Error uploading unit test file:", error);
    }
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
          <img
            src={unitTestFile ? DropUnitTest : intialDropUnitTest}
            alt="Upload Unit Test"
          />
        </div>
        <input type="file" onChange={handleUnitTestFileChange} />
      </div>
      {/*Added drop*/}
      {unitTestFile && (
        <div className="drop-file-preview">
          <div className="drop-file-preview__item">
            <img
              src={
                ImageConfig[unitTestFile.type.split("/")[1]] ||
                ImageConfig["default"]
              }
            />
            <div className="drop-file-preview__item__info">
              <p>{unitTestFile.name}</p>
              <p>{unitTestFile.size}B</p>
            </div>
            <span
              className="drop-file-preview__item__del"
              onClick={() => setUnitTestFile(null)}
            >
              x
            </span>
          </div>
          <Button
            variant="contained"
            onClick={handleUnitTestUpload}
            style={{
              backgroundColor: "#00989B",
              color: "white",
              width: "50vh",
              height: "7vh",
              borderRadius: "10px",
              marginTop: "5%",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Ready to upload
          </Button>
        </div>
      )}
      <div className="drop-file-response">
        {unitTestId && (
          <div>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Unit Test ID: {unitTestId}
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}

export default UnitTestUpload;
