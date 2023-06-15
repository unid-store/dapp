"use client";

import { useState } from "react";
import va from "@vercel/analytics";

import { UploadIcon } from "@/components/media/icons/UploadIcon";
import { WithToast } from "@/components/feedback/WithToast";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";

import FileDropZone from "./FileDropZone";
import { upload } from "./HandleUpload";
import FileTable from "./FileTable";

export default function Upload() {
  const [uploading, setUploading] = useState<boolean>();
  const [files, setFiles] = useState<File[]>([]);
  const [exists, setExists] = useState<boolean>();
  const [cid, setCID] = useState<string>();

  const handleUpload = async (acceptedFiles: File[]) => {
    setUploading(true);

    const { cid, exists } = await upload(acceptedFiles);

    if (!exists)
      va.track("upload", {
        size: acceptedFiles.reduce((total, file) => total + file.size, 0),
        files: acceptedFiles.length,
      });

    setFiles(acceptedFiles);
    setCID(cid);
    setExists(exists);
    setUploading(false);
  };

  const handleReset = () => {
    setUploading(false);
    setFiles([]);
    setExists(false);
    setCID(undefined);
  };

  const uploadState = <FileDropZone onDrop={handleUpload} />;

  const resultState = (
    <div className="flex flex-col">
      <FileTable files={files} cid={cid!} />
      <Button
        onClick={handleReset}
        className="bg-gradient-to-r from-gray-600 to-gray-900 p-4 mt-2 w-full cursor-pointer flex items-center"
      >
        <UploadIcon />
        <p className={"ml-2"}>{"Upload again ..."}</p>
      </Button>
    </div>
  );

  return (
    <>
      {(uploading && <Spinner />) || (!cid && uploadState) || resultState}
      {exists && (
        <WithToast
          title={`✅ uploaded already `}
          subtitle={"check the link!"}
          show
        />
      )}
    </>
  );
}
