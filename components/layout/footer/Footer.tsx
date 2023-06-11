import { PrivacyPolicyIcon } from "@/components/media/icons/PrivacyPolicyIcon";
import { TermsAndConditionsIcon } from "@/components/media/icons/TermsAndConditionsIcon";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-2 px-2">
      <div className="flex justify-center">
        <a
          href="https://github.com/unid-store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
};
