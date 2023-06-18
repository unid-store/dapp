import { Roboto_Mono } from "next/font/google";

import { Header, Footer } from "@/components/layout";
import "./globals.css";
import { cn } from "@/lib/utils";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={robotoMono.className}>
    <body>
      <div
        className={cn(
          "flex flex-col min-h-screen",
          "bg-gradient-to-r from-gray-200 to-gray-600 "
        )}
      >
        <Header />
        <main className="flex flex-grow flex-col justify-between items-center">
          {children}
        </main>
        <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
