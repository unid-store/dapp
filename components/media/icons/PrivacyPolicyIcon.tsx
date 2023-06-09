import React from "react";

interface UploadIconProps {
  size?: "small" | "medium" | "large";
}

export const PrivacyPolicyIcon = ({ size = "medium" }: UploadIconProps) => {
  const getSizeClass = (size: UploadIconProps["size"]) => {
    switch (size) {
      case "small":
        return "w-8 h-8";
      case "medium":
        return "w-12 h-12";
      case "large":
        return "w-16 h-16";
      default:
        return "w-12 h-12";
    }
  };

  const sizeClass = getSizeClass(size);

  return <img src="/pp.png" alt="Logo" className={`${sizeClass} rounded`} />;
};
