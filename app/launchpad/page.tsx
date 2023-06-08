"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const FileTable = dynamic(() => import("@/components/upload/FileTable"), {
  ssr: false,
});

export default function LaunchPad() {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const removeAllFiles = () => setFiles([]);

  useEffect(() => {
    const generateRandomFile = async (): Promise<File> => {
      const { faker } = await import("@faker-js/faker");
      const fileName = faker.system.fileName();
      const mimeType = faker.system.mimeType();
      const fileSize = faker.number.int({ min: 100, max: 10000 });

      const blob = new Blob([faker.string.alphanumeric(fileSize)], {
        type: mimeType,
      });

      return new File([blob], fileName, { type: mimeType });
    };

    const generateNRandomFiles = async (n: number): Promise<File[]> =>
      await Promise.all(
        Array.from({ length: n }, async () => await generateRandomFile())
      );

    if (files.length === 0) {
      generateNRandomFiles(10).then((result) => setFiles(result));
    }
  }, []);

  return (
    <FileTable
      files={files}
      removeFile={removeFile}
      removeAllFiles={removeAllFiles}
    />
  );
}
