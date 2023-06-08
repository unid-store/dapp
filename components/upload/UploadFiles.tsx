"use client";

import { useState, useCallback } from "react";
import { NFTStorage } from "nft.storage";

import FileTable from "./FileTable";
import FileDropZone from "./FileDropZone";

import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function UploadFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const [cid, setCID] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const NFT_STORAGE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZhNEYzRTc2NzE3MTFkNDhjNzY0Y2VhOTRiQWRiZWE1NDA2MjVGNDAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjIwMjcyMTQ3OCwibmFtZSI6InVuaWQuc3RvcmUifQ.VtaMS2CY4fabEOQ00Z8njKZAQnu48Yl_wenDNQJTClg";

  const nftStorageClient = new NFTStorage({ token: NFT_STORAGE_KEY });

  const handleUpload = async () => {
    setUploading(true);
    await nftStorageClient.storeDirectory(files).then((cid) => {
      setFiles([]);
      setCID(cid);
      setUploading(false);
    });
  };

  return (
    <>
      {(uploading && <Spinner />) || (
        <>
          <FileDropZone onDrop={onDrop} />
          {files.length > 0 && (
            <>
              <FileTable
                files={files}
                removeFile={removeFile}
                removeAllFiles={() => setFiles([])}
              />
              <Button variant={"default"} onClick={handleUpload}>
                {"Upload"}
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
