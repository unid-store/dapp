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
  description: "Generated by create next app",
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
          <div className="flex flex-col items-center justify-center flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
