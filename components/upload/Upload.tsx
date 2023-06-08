"use client";

import { useState, useCallback } from "react";
import { NFTStorage } from "nft.storage";

import FileTable from "./FileTable";
import FileDropZone from "./FileDropZone";

import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export default function Upload() {
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

  const handleReset = () => {
    setCID(undefined);
  };

  return (
    <>
      {uploading ? (
        <Spinner />
      ) : cid ? (
        <div className="mt-4">
          <div className="mb-4">Your file was uploaded successfully.</div>
          <a
            href={`https://nftstorage.link/ipfs/${cid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-200 rounded px-3 py-2 mb-3 text-black font-semibold hover:bg-gray-300 transition duration-300"
          >
            View File
          </a>
          <button
            onClick={handleReset}
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Upload Again
          </button>
        </div>
      ) : (
        <>
          <FileDropZone onDrop={onDrop} />
          {files.length > 0 && (
            <>
              <FileTable
                files={files}
                removeFile={removeFile}
                removeAllFiles={() => setFiles([])}
              />
              <Button
                variant={"default"}
                onClick={handleUpload}
                className="mt-4"
              >
                {"Upload"}
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
