import { useState, type FC } from "react";

import { PageContent } from "../components/PageContent";
import { FileUpload } from "../custom-components/FileUpload";
import { InlineWidget, type Item } from "../components/InlineWidget";

export const content = `
This component allows you to upload files to your bot. You can use it to upload images, videos, audio files, PDFs, etc.

~~~js
const FileUpload = ({ onUploadComplete }) => {
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

  return html\`
    <div
      className=\${dragOver ? "file-upload file-upload-drag-over" : "file-upload"}
      onDragOver=\${handleDragOver}
      onDragLeave=\${handleDragLeave}
      onDrop=\${handleDrop}
      onClick=\${() => document.getElementById("file-upload")?.click()}
    >
      <input type="file" id="file-upload" hidden onChange=\${handleFileChange} />
      <div className="file-input-custom">
        <div className="file-input-custom-icon">
          \${uploadProgress > 0 ?
            '<CircularProgressBar progress=' + uploadProgress + ' size=25 strokeWidth=2 />' :
            '<img src=' + uploadIcon + ' alt="upload" className="file-input-button-icon" />'}
        </div>
        <span className="file-input-name">
          \${selectedFile?.name ?? "Select a file..."}
        </span>
      </div>
    </div>
  \`;
};
~~~
`;

export const navGroup: string = "Web widget components";

export const title: string = "File upload";

export const Content: FC<unknown> = () => {
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const items: Item[][] = [
    [
      {
        type: "custom",
        element: (
          <FileUpload
            onUploadCompleted={(fileName: string) => {
              setUploaded(true);
              setFileName(fileName);
            }}
          />
        ),
      },
    ],
  ];

  if (uploaded) {
    items.push([
      {
        type: "bot",
        message: `Your file \`${fileName}\` was uploaded.`,
      },
    ]);
  }

  return (
    <>
      <InlineWidget items={items} />
      <PageContent md={content} />
    </>
  );
};
