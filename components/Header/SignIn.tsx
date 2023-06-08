"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import WithNotification from "../feedback/WithNotification";

export const SignIn = () => (
  <WithNotification
    title={"NOt implemented yet"}
    subtitle={"Stay tuned as we implement walletconnect v2 soon!"}
  >
    <Button variant={"outline"}>Connect Wallet</Button>
  </WithNotification>
);
