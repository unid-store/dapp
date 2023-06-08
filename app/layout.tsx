import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Universal Decentralized Storage",
  description: "Simple & quick file sharing, but decentralized. Upload file to to share with friends, no registration is needed. The file would be stored in IPFS and available to public, so do not share any sensitive information. The project is build for ETHGlobal Hack 2023, with the idea to improve UX with interaction with Filecoin, solving a common problem of quick and convinient file sharing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-col items-center justify-center flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
