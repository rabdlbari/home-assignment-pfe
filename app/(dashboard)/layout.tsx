import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarApp } from "@/components/sidebar";

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
        <body className={`${poppins.variable} min-h-screen`}>
          <SidebarProvider defaultOpen={false}>
            <SidebarApp />
            <main className="flex-1 flex flex-col overflow-x-hidden">
              <header className="flex justify-between items-center w-full py-2 px-6 border bg-white/80 backdrop-blur-xl dark:bg-black/80">
                <div className="flex">
                  <SidebarTrigger />
                  {/* <div className="font-bold text-xl">A.R</div> */}
                </div>
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
            </main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
