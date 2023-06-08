import { NextPage } from "next";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface NotImplAlertProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
}

const NotImplAlert: NextPage<NotImplAlertProps> = ({
  onClose,
  title,
  subtitle,
}) => {
  return (
    <motion.div
      className="fixed top-24 right-0 mr-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
        <Button onClick={onClose}> {"Close"} </Button>
      </div>
    </motion.div>
  );
};

export default NotImplAlert;
