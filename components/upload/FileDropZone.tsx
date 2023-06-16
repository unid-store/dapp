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
    <div
      {...getRootProps()}
      className="md:hidden p-6 rounded bg-gradient-to-r from-gray-600 to-gray-900"
    >
      <Button>
        <input {...getInputProps()} />
        <UploadIcon className="w-12 h-12" />
      </Button>
    </div>
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
      className={`bg-gradient-to-r from-gray-600 to-gray-900 h-15  w-2/3 lg:w-1/3 rounded cursor-pointer mb-6 md:block hidden text-white`}
    >
      <input {...getInputProps()} />
      {(!isDragActive && (
        <div className="flex items-center p-4 border border-gray-200 hover:bg-gray-800 hover:border-gray-800 active:bg-gray-900 active:border-gray-900 rounded">
          <UploadIcon className="w-8 h-8" />
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
