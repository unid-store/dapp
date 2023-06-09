import { Logo } from "@/components/media/Logo";
import { ConnectButton } from "@/components/connect/ConnectButton";

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <div className="flex items-center">
        <Logo size={"large"} />
        <div className="hidden sm:block ml-3 text-lg sm:text-2xl font-bold">
          Universal Decentralized Storage
        </div>
      </div>
      <ConnectButton />
    </header>
  );
};
