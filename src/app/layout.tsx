import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
require("@solana/wallet-adapter-react-ui/styles.css");

import { Blur } from "~/components/Blur";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Texture } from "~/components/TextTure";
import { AnimateEnter } from "~/components/AnimateEnter";
import { Navigation } from "~/components/Navigation";
import { ProgramProvider } from "~/context/ProgramContext";
import { WalletConnectProvider } from "~/components/WalletConnectProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sphere solana starter",
  description: "sphere solana starter",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${inter.variable} font-poppins bg-background h-auto min-h-screen overflow-y-auto outline-none`}
      >
        <WalletConnectProvider>
          <ProgramProvider>
            <Blur />
            <Texture />
            <Navigation />
            <ToastContainer />
            <AnimateEnter>{children}</AnimateEnter>
          </ProgramProvider>
        </WalletConnectProvider>
      </body>
    </html>
  );
}
