"use client";

import { useState, useEffect } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { WithToast } from "@/components/feedback/WithToast";

import FileDropZone from "./FileDropZone";
import { upload } from "./HandleUpload";
import FileTable from "./FileTable";

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [cid, setCID] = useState<string>();
  const [exists, setExists] = useState(false);

  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async (files: File[]) => {
    setFiles(files);
    setUploading(true);
    const { cid, exists } = await upload(files);
    setCID(cid);
    setExists(exists);
    setUploading(false);
  };

  const handleReset = () => {
    setCID(undefined);
    setFiles([]);
  };

  return (
    <>
      {uploading ? (
        <Spinner />
      ) : cid ? (
        <div>
          {exists && (
            // @TODO refactor `WithToast` and `Toast` to allow show conditionally toast, or conditional wrapper
            <WithToast
              title={`✅ uploaded already `}
              subtitle={"check the link!"}
              show
            >
              <></>
            </WithToast>
          )}
          <FileTable files={files} cid={cid} />
          <Button onClick={handleReset} className="mt-4 w-full text-center">
            {"Upload Again"}
          </Button>
        </div>
      ) : (
        <>
          <FileDropZone onDrop={async (files: File[]) => handleUpload(files)} />
        </>
      )}
    </>
  );
}
