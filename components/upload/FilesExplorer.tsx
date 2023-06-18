import { formatFileName, formatFileSize } from "@/lib/files";

interface FileTableProps {
  files: File[];
  filesSize: number;
}

export const FilesExplorer = ({ files, filesSize }: FileTableProps) => (
  <table className="table-auto text-xs ">
    <thead className="bg-gradient-to-r from-gray-600 to-gray-900 ">
      <tr className="text-white">
        <th className="rounded-tl-md px-10 py-1  text-left">Name</th>
        <th className="rounded-tr-md pr-12 text-right">Size</th>
      </tr>
    </thead>
    <tbody>
      {files.map((file, index) => (
        <tr key={index} className={"bg-white"}>
          <td className="px-10 py-1 ">{formatFileName(file.name)}</td>
          <td className="px-6 py-1 text-right">{formatFileSize(file.size)}</td>
        </tr>
      ))}
      {/* @REFACTOR move logic of rounded for last row to be rounded and others */}
      <tr className="bg-white">
        <td className="pt-1 rounded-bl-md" />
        <td className="rounded-br-md" />
      </tr>
      {files.length > 1 && (
        <tr className="bg-gray-50  border-t-2">
          <td className=" pl-6 rounded-bl-md">Total: {files.length} files</td>
          <td className=" pr-6 rounded-br-md text-right">
            {formatFileSize(filesSize)}
          </td>
        </tr>
      )}
    </tbody>
  </table>
);
