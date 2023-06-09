import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-4 px-6">
      <div className="flex justify-center items-center">
        <a
          href="https://github.com/unid-store"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          <FaGithub size={24} />
        </a>
        {/* // @TODO add twitter handle */}
        {/* <a
          href="https://twitter.com/your-twitter-url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={24} />
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
