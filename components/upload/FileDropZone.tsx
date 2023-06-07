import { NextPage } from "next";
import React from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

interface FileDropZoneProps {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}

const FileDropZone: NextPage<FileDropZoneProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-dashed border-2 p-6 rounded cursor-pointer mb-6 ${
        isDragActive ? "bg-gray-200" : "bg-gray-100"
      }`}
    >
      <input {...getInputProps()} />
      <p>{"Drag 'n' drop some files here, or click to select files"}</p>
      {isDragActive && <p>Drop the files here ...</p>}
    </div>
  );
};

export default FileDropZone;
