import { Roboto_Mono } from "next/font/google";

import { Header, Footer } from "@/components/layout";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Universal Decentralized Storage",
  description:
    "File sharing simple, quick but decentralized. Upload and share with no registration required. Your data is stored in public decentralized storage, making it accessible to all, so please refrain from sharing sensitive information💡. This project was crafted for ETHGlobal HackFS 2023, aiming to enhance UX interactions with decentralized storage, effectively addressing the need for speedy and convenient file sharing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoMono.className}>
      <body>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-gray-200 to-gray-600 p-4">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
