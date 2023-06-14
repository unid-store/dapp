import Link from "next/link";

import { ConnectButton } from "@/components/connect/ConnectButton";
import { Logo } from "@/components/media/Logo";

export const Header = () => {
  return (
    <header className="px-2 py-2 flex justify-between items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <Link href={"/"} className="flex items-center">
        <Logo size={"medium"} />
        <div className="hidden sm:block ml-3 text-lg sm:text-2xl font-bold">
          Universal Decentralized Storage
        </div>
      </Link>
      <ConnectButton />
    </header>
  );
};
