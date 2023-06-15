import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  variant?: "default" | "outlined";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  variant,
  children,
  className,
  onClick,
}: ButtonProps) => {
  const styles = {
    default:
      "bg-black text-gray-200 border border-gray-200 hover:bg-gray-800 hover:border-gray-800 active:bg-gray-900 active:border-gray-900",
    outlined:
      "bg-transparent border-black border-2 text-black hover:bg-gray-200 hover:border-gray-200 active:bg-gray-300 active:border-gray-300",
  };

  return (
    <button
      className={cn(
        "rounded-md transition-colors",
        `${styles[variant ?? "default"]}`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
