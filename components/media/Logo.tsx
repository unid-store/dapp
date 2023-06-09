import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

export const Logo = ({ size = "medium" }: LogoProps) => {
  const getSizeClass = (size: LogoProps["size"]) => {
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

  return <img src="/logo.png" alt="Logo" className={sizeClass} />;
};
