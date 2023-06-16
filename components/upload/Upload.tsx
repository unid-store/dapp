"use client";

import { useMemo, useState } from "react";
import va from "@vercel/analytics";

import { Copy, ExternalLink } from "lucide-react";

import FileDropZone from "./FileDropZone";
import { upload } from "./HandleUpload";
import FileTable from "./FileTable";

import { UploadIcon } from "@/components/media/icons/UploadIcon";
import { WithToast } from "@/components/feedback/WithToast";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import calculateTotalFilesSize from "@/lib/files/calculateTotalFilesSize";

export default function Upload() {
  const [uploading, setUploading] = useState<boolean>();
  const [files, setFiles] = useState<File[]>([]);
  const filesSize = useMemo(() => calculateTotalFilesSize(files), [files]);
  const [exists, setExists] = useState<boolean>(false);
  const [cid, setCID] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  const handleUpload = async (acceptedFiles: File[]) => {
    setUploading(true);
    setFiles(acceptedFiles);

    const { cid, exists } = await upload(
      acceptedFiles,
      setProgress,
      setStarted
    );

    // @NOTE remove code between dash lines - if migrated from vercel hosting
    // ----
    if (!exists)
      va.track("upload", {
        size: filesSize,
        files: acceptedFiles.length,
      });
    // ----

    setCID(cid);
    setExists(exists);
    setUploading(false);
  };

  const handleReset = () => {
    setUploading(false);
    setFiles([]);
    setExists(false);
    setCID("");
    setProgress(0);
  };

  const genLink = () =>
    `https://${cid}.ipfs.nftstorage.link/${
      files.length > 1 ? "" : files[0].name
    }`;

  const handleOpenLink = () => window.open(genLink(), "_blank");

  const uploadState = <FileDropZone onDrop={handleUpload} />;

  const [copied, setCopied] = useState<boolean>();
  const resultState = (
    <div className="flex flex-col w-2/3 lg:w-1/3">
      <FileTable files={files} filesSize={filesSize} />

      <Command className="rounded-lg border shadow-md mt-4">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-gray-600 to-gray-900 p-1 w-full cursor-pointer flex items-center"
              >
                <UploadIcon className="w-8 h-8" />
                <p className={"ml-2"}>{"Upload again"}</p>
              </Button>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              {(copied && (
                <Button className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center">
                  <Copy className="w-6 h-6" />
                  <p className={"ml-2"}>{"Copied ✅"}</p>
                </Button>
              )) || (
                <Button
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(genLink());
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                  className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center"
                >
                  <Copy className="w-6 h-6" />
                  <p className={"ml-2"}>{"Copy link"}</p>
                </Button>
              )}
            </CommandItem>
            <CommandItem>
              <Button
                onClick={handleOpenLink}
                className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center"
              >
                <ExternalLink className="w-6 h-6" />
                <p className={"ml-2"}>{"Open link"}</p>
              </Button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );

  return (
    <>
      {(uploading && (
        <Spinner total={filesSize} progress={progress} started={started} />
      )) ||
        (!cid && uploadState) ||
        resultState}
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
