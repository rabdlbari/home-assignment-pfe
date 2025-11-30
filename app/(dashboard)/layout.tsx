import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Encode_Sans } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarApp } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Dashboard",
  description: "The platform for managing agencies and contacts.",
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
        <body className={`${encode_Sans.className} min-h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={true}>
              <SidebarApp />
              <main className="flex-1 flex flex-col overflow-x-hidden">
                <header className="flex justify-between items-center w-full py-1 px-6 border bg-white/80 backdrop-blur-xl dark:bg-black/80">
                  <div className="flex">
                    <SidebarTrigger />
                  </div>
                  <div className="flex gap-4 items-center">
                    <ModeToggle />
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </header>
                {children}
                <footer className="mt-auto py-3 px-6 text-xs text-muted-foreground text-center border-t">
                  © {new Date().getFullYear()} AR. All rights reserved.
                </footer>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
