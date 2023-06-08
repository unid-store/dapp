"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NotImplAlert from "@/components/feedback/NotImplAlert";
import { AnimatePresence } from "framer-motion";

const SignIn: NextPage = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false); // Automatically close the alert after 5 seconds
    }, 2500);

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, [isOpen]);

  return (
    <>
      <Button variant={"outline"} onClick={() => setIsOpen(true)}>
        Connect Wallet
      </Button>
      <AnimatePresence>
        {isOpen && (
          <NotImplAlert
            onClose={() => setIsOpen(false)}
            title={"Not implemented yet!"}
            subtitle={"Stay tuned as we integrate walletconnect v2 soon!"}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SignIn;
