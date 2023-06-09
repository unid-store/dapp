import { motion } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  timeout?: number; // timeout in milliseconds
}

export const Toast = ({ onClose, title, subtitle, timeout }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the toast after the timeout
    }, timeout);

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, [onClose, timeout]);

  return (
    <motion.div
      className="fixed top-16 right-0 m-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 text-black flex flex-col items-start">
        {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </motion.div>
  );
};
