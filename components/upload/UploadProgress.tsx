import { useEffect, useState } from "react";

import { formatFileSize } from "@/lib/files";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  total?: number;
  progress?: number;
}
export const UploadProgress = ({ total, progress }: UploadProgressProps) => {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  useEffect(() => {
    total && progress && setProgressPercentage((progress / total) * 100);
  }, [total, progress]);

  return (
    <div className="flex flex-col items-center w-2/3 lg:w-1/3">
      {progress === 0 && "Packaging files ..."}
      {progress !== 0 && (
        <>
          {"Uploading ..."}
          <Progress value={progressPercentage} />
          {progress && formatFileSize(progress)}
          {"/"}
          {total && formatFileSize(total)}
        </>
      )}
    </div>
  );
};
