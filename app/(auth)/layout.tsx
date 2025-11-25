import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} flex flex-col h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
