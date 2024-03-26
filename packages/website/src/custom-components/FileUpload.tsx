import "./FileUpload.css";
import uploadIcon from "./upload.png";
import React, { type FC, useState, type DragEvent } from "react";

interface CircularProgressBarProps {
  progress: number;
  size: number;
  strokeWidth: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size,
  strokeWidth,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="circular-progress-bar"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size}>
        <circle
          className="progress-ring__background"
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="progress-ring__circle"
          stroke="green"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
};

export const FileUpload: FC<{
  onUploadCompleted: (fileName: string) => void;
}> = ({ onUploadCompleted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const uploadFile = (file: File) => {
    const uploadTime = 2000;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          onUploadCompleted(file.name);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, uploadTime / 10);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      uploadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`file-upload ${dragOver ? "file-upload-drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-upload")?.click()}
    >
      <input type="file" id="file-upload" hidden onChange={handleFileChange} />
      <div className="file-input-custom">
        <div className="file-input-custom-icon">
          {uploadProgress > 0 ? (
            <CircularProgressBar
              progress={uploadProgress}
              size={25}
              strokeWidth={2}
            />
          ) : (
            <img
              src={uploadIcon}
              alt="upload"
              className="file-input-button-icon"
            />
          )}
        </div>
        <span className="file-input-name">
          {selectedFile?.name ?? "Select a file..."}
        </span>
      </div>
    </div>
  );
};
