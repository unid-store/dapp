"use client";

import * as React from "react";
import { ChevronsUpDown, HardDrive, Construction } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "../ui/Button";

export const ServiceProviderOpts = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-2/3 lg:w-1/3 space-y-2 mb-4 font-semibold"
    >
      <div className="flex items-center justify-between space-x-4 px-4 mb-4">
        <h4 className="text-sm">Storage providers:</h4>
        <CollapsibleTrigger asChild>
          <Button variant="outlined">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <a href="https://nft.storage" target="_blank" rel="noopener noreferrer">
        <div className="flex justify-between items-center rounded-md border px-4 py-6 font-mono text-sm ">
          <img
            className="w-8 h-8 rounded"
            src="https://avatars.githubusercontent.com/u/81696905?s=200&v=4"
            alt="nft.storage"
          />
          {"nft.storage"}
          <HardDrive />
        </div>
      </a>

      <CollapsibleContent className="space-y-2">
        <a
          href="https://web3.storage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center rounded-md border px-4 py-2"
        >
          <img
            className="w-8 h-8 rounded"
            alt="web3.storage"
            src="https://avatars.githubusercontent.com/u/86230656?s=200&v=4"
          />
          {"web3.storage"}
          <Construction />
        </a>
        <a
          href="https://fvm.filecoin.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center rounded-md border px-4 py-2 font-mono text-sm"
        >
          <img
            className="w-8 h-8 rounded"
            alt="filecoin-vm"
            src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fgwrmj%2Flogo%2F1685373604361_fvm.png"
          />
          {"Filecoin VM"}
          <Construction />
        </a>
        <a
          href="https://ceramic.network/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center rounded-md border px-4 py-2 font-mono text-sm"
        >
          <img
            className="w-8 h-8 rounded"
            alt="ceramic"
            src="https://storage.googleapis.com/ethglobal-api-production/organizations%2F96pd9%2Flogo%2F1684767570259_QoGbRSMz_400x400.jpeg"
          />
          {"Ceramic"}
          <Construction />
        </a>
        <a
          href="https://spheron.network/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center rounded-md border px-4 py-2 font-mono text-sm"
        >
          <img
            className="w-8 h-8 rounded"
            alt="spheron"
            src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fomyxt%2Flogo%2F1685023263469_YVirHFeG_400x400.jpeg"
          />
          {"Spheron"}
          <Construction />
        </a>
        <a
          href="https://www.lighthouse.storage/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center rounded-md border px-4 py-2 font-mono text-sm"
        >
          <img
            className="w-8 h-8 rounded"
            alt="lighthouse"
            src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fx2bo0%2Flogo%2F1673997323200_G-9dkMwk_400x400.jpeg"
          />
          {"Lighthouse Storage"}
          <Construction />
        </a>
      </CollapsibleContent>
    </Collapsible>
  );
};
