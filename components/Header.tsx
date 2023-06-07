import { Button } from "@/components/ui/button";
import { NotImplAlert } from "./feedback/NotImplAlert";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <div className="flex items-center mb-4 sm:mb-0">
        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
        <h1 className="ml-3 text-lg sm:text-2xl font-bold">
          Universal Decentralized Storage
        </h1>
      </div>
      <NotImplAlert>
        <Button variant={"outline"}>Sign in</Button>
      </NotImplAlert>
    </header>
  );
};

export default Header;
