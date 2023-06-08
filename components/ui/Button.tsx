import React, { HTMLAttributes } from "react";

interface ButtonProps {
  variant: "default" | "outlined";
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}

const Button = ({ variant, children, className, onClick }: ButtonProps) => {
  const styles = {
    default:
      "bg-black text-gray-200 border border-gray-200 hover:bg-gray-800 hover:border-gray-800 active:bg-gray-900 active:border-gray-900",
    outlined:
      "bg-transparent border-black border-2 text-black hover:bg-gray-200 hover:border-gray-200 active:bg-gray-300 active:border-gray-300",
  };

  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
