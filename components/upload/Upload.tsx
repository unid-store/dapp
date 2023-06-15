"use client";

import { useState } from "react";
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

  const genLink = () =>
    `https://${cid}.ipfs.nftstorage.link/${
      files.length > 1 ? "" : files[0].name
    }`;

  const handleOpenLink = () => window.open(genLink(), "_blank");

  const uploadState = <FileDropZone onDrop={handleUpload} />;

  const [copied, setCopied] = useState<boolean>();
  const resultState = (
    <div className="flex flex-col">
      <FileTable files={files} />

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
