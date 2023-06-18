import { formatFileName, formatFileSize } from "@/lib/files";

interface FileTableProps {
  files: File[];
  filesSize: number;
}

export const FilesExplorer = ({ files, filesSize }: FileTableProps) => (
  <table className="table-auto text-center text-xs">
    <thead className="gradient">
      <tr className="text-white">
        <th className="rounded-tl-md">Name</th>
        <th className="rounded-tr-md">Size</th>
      </tr>
    </thead>
    <tbody>
      {files.map((file, index) => (
        <tr key={index} className={"bg-white"}>
          <td>{formatFileName(file.name)}</td>
          <td>{formatFileSize(file.size)}</td>
        </tr>
      ))}
      {files.length > 1 && (
        <tr className="bg-gray-50  border-t-2">
          <td className=" pl-6 rounded-bl-md">Total: {files.length} files</td>
          <td className=" pr-6 rounded-br-md">{formatFileSize(filesSize)}</td>
        </tr>
      )}
    </tbody>
  </table>
);
