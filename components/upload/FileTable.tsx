import { Button } from "../ui/Button";
import { FaMinus, FaRegTrashAlt } from "react-icons/fa";

interface FileTableProps {
  files: File[];
  removeFile: (file: File) => void;
  removeAllFiles: () => void;
}

const FileTable = ({ files, removeFile, removeAllFiles }: FileTableProps) => {
  const totalSize = files.reduce((total, file) => total + file.size, 0);

  return (
    <table className="table-auto w-full text-gray-700">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Size
          </th>
          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {files.map((file, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <td className="px-6 py-4 whitespace-nowrap">{file.name}</td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              {formatFileSize(file.size)}
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap">
              <Button
                onClick={() => removeFile(file)}
                variant="outlined"
                className="bg-white border-red-200 hover:bg-white hover:border-red-700 active:bg-red-900 active:border-red-900"
              >
                <FaMinus className="text-red-500 text-xs" />
              </Button>
            </td>
          </tr>
        ))}
        <tr className="bg-gray-50">
          <td className="px-6 py-4">Total: {files.length} files</td>
          <td className="px-6 py-4 text-center">{formatFileSize(totalSize)}</td>
          <td className="px-6 py-4 text-center">
            <Button
              onClick={removeAllFiles}
              variant="outlined"
              className="bg-white border-red-200 hover:bg-white hover:border-red-700 active:bg-red-900 active:border-red-900"
            >
              <FaRegTrashAlt className="text-red-500 text-xs" />
            </Button>
          </td>
        </tr>
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

export default FileTable;
