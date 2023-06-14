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

  useEffect(() => {
    const handleUpload = async () => {
      setUploading(true);
      const { cid, exists } = await upload(files);
      setCID(cid);
      setExists(exists);
      setUploading(false);
    };
    files.length > 0 && !cid && handleUpload();
  }, [files, cid]);

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
              title={`${
                files.length > 0 ? "Files" : "File"
              } uploaded already! `}
              subtitle={"Check the link!"}
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
          <FileDropZone onDrop={async (files: File[]) => setFiles(files)} />
        </>
      )}
    </>
  );
}
