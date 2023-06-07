import { Button } from "../ui/button";

interface FileTableProps {
  files: File[];
  removeFile: (file: File) => void;
}

const FileTable: React.FC<FileTableProps> = ({ files, removeFile }) => {
  return (
    <table className="table-auto w-full text-gray-600">
      <tbody>
        {files.map((file, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <td className="px-4 py-2">{file.name}</td>
            <td className="px-4 py-2">
              <Button
                onClick={() => removeFile(file)}
                className="text-red-500 hover:text-red-700 transition-colors duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
