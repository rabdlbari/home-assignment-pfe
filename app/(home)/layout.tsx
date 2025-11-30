import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { Suspense } from "react";
import { Encode_Sans, Poppins } from "next/font/google";
import "../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Dashboard - App",
  description: "Administrative dashboard for managing agencies and contacts.",
  keywords: ["dashboard", "agencies", "contacts"],
  authors: [{ name: "Abdelbarie" }],
  openGraph: {
    title: "Dashboard App",
    description: "Administrative dashboard for managing agencies and contacts.",
    url: "https://home-assignment-pfe.vercel.app",
    siteName: "My App",
    locale: "en_US",
    type: "website",
  },
};

const encode_Sans = Encode_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-encode-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${encode_Sans.className} flex flex-col h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="flex justify-between items-center w-full sm:w-6xl mx-auto py-2 px-6 sticky top-0 z-50 border rounded-full mt-2 backdrop-blur-xl">
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
              <div className="flex gap-4 items-center">
                <ModeToggle />
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
              </div>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
