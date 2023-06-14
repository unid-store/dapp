"use client";

import { useState, useEffect } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { WithToast } from "@/components/feedback/WithToast";

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
    setFiles(acceptedFiles);
    const { cid, exists } = await upload(acceptedFiles);
    setCID(cid);
    setExists(exists);
    setUploading(false);
  };

  const handleReset = () => {
    setCID(undefined);
    setFiles([]);
  };

  const uploadState = <FileDropZone onDrop={handleUpload} />;

  const resultState = (
    <div className="flex flex-col">
      <FileTable files={files} cid={cid!} />
      <Button onClick={handleReset} className="mt-4 w-full text-center">
        {"Upload Again"}
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
