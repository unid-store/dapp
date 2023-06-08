import { SignIn, Logo } from ".";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
      <Logo />
      <SignIn />
    </header>
  );
};

export default Header;
