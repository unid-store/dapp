import React from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

import { UploadIcon } from "@/components/media/icons/UploadIcon";
import { Button } from "../ui/Button";

interface FileDropZoneProps {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}

const MobileUploadButton = ({ onDrop }: FileDropZoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <button
      {...getRootProps()}
      className="bg-gray-700 hover:bg-gray-500 py-2 px-4 rounded  md:hidden"
    >
      <input {...getInputProps()} />
      <UploadIcon />
    </button>
  );
};

const DesktopDropZone = ({ onDrop }: FileDropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`bg-gradient-to-r from-gray-600 to-gray-900 h-15  w-2/3 rounded cursor-pointer mb-6 md:block hidden text-white`}
    >
      <input {...getInputProps()} />
      {(!isDragActive && (
        <div className="flex items-center p-4 border border-gray-200 hover:bg-gray-800 hover:border-gray-800 active:bg-gray-900 active:border-gray-900 rounded">
          <UploadIcon />
          <p className="pl-4">{"Click or drag files here"}</p>
        </div>
      )) || <p>{"Release to drop the files..."}</p>}
    </div>
  );
};

const FileDropZone = ({ onDrop }: FileDropZoneProps) => {
  return (
    <>
      <DesktopDropZone onDrop={onDrop} />
      <MobileUploadButton onDrop={onDrop} />
    </>
  );
};

export default FileDropZone;
