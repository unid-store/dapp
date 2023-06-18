import React from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";

import { cn } from "@/lib/utils";

import { UploadIcon } from "@/components/media/icons/UploadIcon";

interface FileDropZoneProps {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
}

export const FilesChooser = ({ onDrop }: FileDropZoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "bg-gradient-to-r from-gray-600 to-gray-900",
        "cursor-pointer  text-white rounded-md"
      )}
    >
      <input {...getInputProps()} />
      {(!isDragActive && (
        <div
          className={cn(
            "flex items-center p-4 rounded-md",
            "border border-gray-200 hover:bg-gray-800 active:border-gray-900"
          )}
        >
          <UploadIcon className="w-8 h-8" />
          <p className="pl-4">{"Click or drag files here"}</p>
        </div>
      )) || <p>{"Release to drop the files..."}</p>}
    </div>
  );
};
