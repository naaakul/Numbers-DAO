"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { config } from "dotenv";
import { User } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
// import { UserProvider } from "@/lib/contexts/useUser";
import { ModalProvider } from "@/context/ModalContext";
import Modal from "@/components/ui/Modal"
import  { Toaster } from 'react-hot-toast';
config();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-whi`}
      >
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
          config={{
            // Customize Privy's appearance in your app
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://your-logo-url",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          }}
        >
          {/* <UserProvider> */}
          <>
        <ModalProvider>
          <Modal />
         <>
            {children}
          <Toaster position="top-right"  toastOptions={{
    // Define default options
    className: '',
    duration: 4000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}/> 
         </>
        </ModalProvider>
          </> 
          {/* </UserProvider> */}
        </PrivyProvider>
      </body>
    </html>
  );
}
