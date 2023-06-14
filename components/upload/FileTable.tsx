import { LuFileSymlink, LuFolderSymlink } from "react-icons/lu";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface FileTableProps {
  files: File[];
  cid: string;
}

const FileTable = ({ files, cid }: FileTableProps) => {
  const totalSize = files.reduce((total, file) => total + file.size, 0);

  const genLink = (file?: File) =>
    `https://${cid}.ipfs.nftstorage.link/${file ? file.name : ""}`;

  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-50 text-xs m-10">
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th />
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {files.map((file, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              {formatFileName(file.name)}
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              {formatFileSize(file.size)}
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              <Link target="_blank" href={genLink(file)}>
                <Button>
                  <LuFileSymlink />
                </Button>
              </Link>
            </td>
          </tr>
        ))}
        {files.length > 1 && (
          <tr className="bg-gray-50">
            <td className="px-6 py-4">Total: {files.length} files</td>
            <td className="px-6 py-4 text-center">
              {formatFileSize(totalSize)}
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              <Link target="_blank" href={genLink()}>
                <Button>
                  <LuFolderSymlink />
                </Button>
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

function formatFileSize(fileSize: number): string {
  if (fileSize < 1024) {
    return fileSize + " B";
  } else if (fileSize < 1024 * 1024) {
    return (fileSize / 1024).toFixed(2) + " KB";
  } else {
    return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
  }
}

function formatFileName(fileName: string): string {
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );

  let maxLen = isMobileDevice ? 16 : 22; // Set maxLen based on device type

  if (fileName.length > maxLen) {
    let splitName = fileName.split(".");
    let ext = splitName.pop();
    let baseName = splitName.join(".");
    return baseName.substring(0, 4) + "..." + baseName.slice(-4) + "." + ext;
  } else {
    return fileName;
  }
}

export default FileTable;
