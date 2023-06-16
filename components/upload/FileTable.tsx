import calculateTotalFileSize from "@/lib/files/calculateTotalFileSize";

interface FileTableProps {
  files: File[];
}

const FileTable = ({ files }: FileTableProps) => {
  const totalSize = calculateTotalFileSize(files);

  return (
    <table className="table-auto w-full text-xs">
      <thead className="bg-gradient-to-r from-gray-600 to-gray-900 ">
        <tr className="text-white">
          <th className="px-10 py-1 rounded-tl-md">{"Name"}</th>
          <th className="rounded-tr-md">Size</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr key={index} className={"bg-white"}>
            <td className="px-10 py-1 ">{formatFileName(file.name)}</td>
            <td className="px-6 py-1 text-right">
              {formatFileSize(file.size)}
            </td>
          </tr>
        ))}
        {files.length > 1 && (
          <tr className="bg-gray-50  border-t-2">
            <td className=" pl-6 rounded-bl-md">Total: {files.length} files</td>
            <td className=" pr-6 rounded-br-md text-right">
              {formatFileSize(totalSize)}
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

  let maxLen = isMobileDevice ? 16 : 36; // Set maxLen based on device type

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
