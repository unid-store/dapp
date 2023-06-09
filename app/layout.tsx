import "./globals.css";
import { Inter } from "next/font/google";

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Universal Decentralized Storage",
  description: "Generated by create next app",
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
