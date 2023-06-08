"use client";

import React, { useState, cloneElement } from "react";
import { AnimatePresence } from "framer-motion";

import { Toast } from "@/components/ui/Toast";

interface WithToastProps {
  children: React.ReactElement; // only a single child is accepted
  title: string;
  subtitle?: string;
  timeout?: number;
}

export const WithToast = ({
  children,
  title,
  subtitle,
  timeout = 2500,
}: WithToastProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // clone to extend object with `onClick` prop
  const clonedChild = cloneElement(children, { onClick: handleOnClick });

  return (
    <>
      {clonedChild}
      <AnimatePresence>
        {isOpen && (
          <Toast
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
