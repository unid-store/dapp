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
    <>
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
    </>
  );
};
