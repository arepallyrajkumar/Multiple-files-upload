import "./styles.css";
import React, { useState } from "react";
import { Button } from "bootstrap";

const MAX_COUNT = 5;
export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUplodaFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitedExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) {
          setFileLimit(true);
        }
        if (uploaded.length > MAX_COUNT) {
          alert(`you can only upload ${MAX_COUNT} files`);
          setFileLimit(false);
          limitedExceeded = true;
          return true;
        }
      }
    });
    if (!limitedExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const choosenfiles = Array.prototype.slice.call(e.target.files);
    handleUplodaFiles(choosenfiles);
  };

  return (
    <div className="App">
      <input
        accept="application/pdf image/png "
        type="file"
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
      />
      <label htmlFor="fileUpload">
        <a className={`btn btn-primary ${!fileLimit ? "" : "disabled"}`}>
          Upload File
        </a>
      </label>
      <div className="uploaded-files-list">
        {uploadedFiles.map((file) => (
          <div>{file.name}</div>
        ))}
      </div>
    </div>
  );
}
