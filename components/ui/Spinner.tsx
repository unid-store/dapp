import formatFileSize from "@/lib/files/formatFileSize";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface SpinnerProps {
  total?: number;
  progress?: number;
  started?: boolean;
}
export const Spinner = ({
  total = undefined,
  progress = undefined,
  started = false,
}: SpinnerProps) => {
  const shouldShowProgress =
    total !== undefined && total !== 0 && progress !== undefined;

  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  useEffect(() => {
    total && progress && setProgressPercentage((progress / total) * 100);
  }, [total, progress]);

  return (
    <div className="flex flex-col items-center w-2/3">
      {!started ? "Packaging files ..." : "Uploading ..."}
      {shouldShowProgress && (
        <>
          <Progress value={progressPercentage} />
          {formatFileSize(progress)} / {formatFileSize(total)}
        </>
      )}
    </div>
  );
};
