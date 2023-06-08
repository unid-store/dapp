"use client";

import React, { useState, cloneElement } from "react";
import { AnimatePresence } from "framer-motion";

import { Notification } from "@/components/ui/Notification";

interface WithNotificationProps {
  children: React.ReactElement; // only a single child is accepted
  title: string;
  subtitle?: string;
  timeout?: number;
}

const WithNotification: React.FC<WithNotificationProps> = ({
  children,
  title,
  subtitle,
  timeout = 5000,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const clonedChild = cloneElement(children, { onClick: handleOnClick });

  return (
    <>
      {clonedChild}
      <AnimatePresence>
        {isOpen && (
          <Notification
            onClose={handleClose}
            title={title}
            subtitle={subtitle}
            timeout={timeout}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WithNotification;
