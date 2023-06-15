import { cn } from "@/lib/utils";
import React from "react";

interface UploadIconProps {
  className?: string;
  onClick?: () => void;
}

export const UploadIcon = ({ className, onClick }: UploadIconProps) => {
  return (
    <img
      onClick={onClick}
      src="/upload.png"
      alt="Logo"
      className={cn("rounded", className)}
    />
  );
};
