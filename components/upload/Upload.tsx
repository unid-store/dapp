"use client";

import { useState, useCallback, useEffect } from "react";
import { NFTStorage } from "nft.storage";

import FileTable from "./FileTable";
import FileDropZone from "./FileDropZone";

import { Spinner } from "@/components/ui/Spinner";
import { Button } from "../ui/Button";

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [cid, setCID] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const handleUpload = async () => {
      setUploading(true);
      // @TODO replace with fetch ucan
      const NFT_STORAGE_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZhNEYzRTc2NzE3MTFkNDhjNzY0Y2VhOTRiQWRiZWE1NDA2MjVGNDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjIwMjcyMTQ3OCwibmFtZSI6InVuaWQuc3RvcmUifQ.VtaMS2CY4fabEOQ00Z8njKZAQnu48Yl_wenDNQJTClg";
      await new NFTStorage({ token: NFT_STORAGE_TOKEN })
        .storeDirectory(files)
        .then((cid) => setCID(cid))
        .finally(() => setUploading(false));
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
