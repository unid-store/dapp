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
      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out md:hidden"
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
      className={`bg-gradient-to-r from-gray-600 to-gray-900 p-6 w-2/3 rounded cursor-pointer mb-6 md:block hidden text-white`}
    >
      <input {...getInputProps()} />
      {(!isDragActive && (
        <Button className="flex items-center justify-left ">
          <UploadIcon />
          <p>{"Click or drag files here"}</p>
        </Button>
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
