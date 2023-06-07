"use client";

import { useState, useCallback } from "react";
import FileDropZone from "./FileDropZone";
import FileTable from "./FileTable";

export default function UploadFiles() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <>
      <FileDropZone onDrop={onDrop} />
      <FileTable files={files} removeFile={removeFile} />
    </>
  );
}
