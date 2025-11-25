import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} flex flex-col h-screen`}>
          <header className="flex justify-between items-center w-full sm:w-6xl mx-auto py-2 px-6 sticky top-0 z-50 border rounded-full mt-2 bg-white/80 backdrop-blur-xl dark:bg-black/80">
            <div className="font-bold text-xl">A.R</div>
            <nav className="lg:block hidden">
              <Button variant={"link"}>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
              <Button variant={"link"}>
                <Link href={"/agencies"}>Agencies</Link>
              </Button>
              <Button variant={"link"}>
                <Link href={"/contacts"}>Contacts</Link>
              </Button>
            </nav>
            <SignedOut>
              <div className="flex gap-4">
                <Button>
                  <Link href={"/login"} className="hover:underline">
                    Login
                  </Link>
                </Button>
                <Button variant={"secondary"}>
                  <Link href={"/signup"} className="hover:underline">
                    Sign up
                  </Link>
                </Button>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
