import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookUser, Building2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex justify-center w-6xl mx-auto py-2 px-6 sticky top-0 z-50 border rounded-full mt-2 bg-white/80 backdrop-blur-xl dark:bg-black/80">
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
      </header>
      <main className="flex flex-col h-full gap-4 justify-center items-center">
        <div className="text-center w-3xl space-y-4">
          <h1 className="text-6xl text-center font-extrabold tracking-tight text-balance">
            A Simple{" "}
            <span className="text-transparent [-webkit-text-stroke:1px_black]">
              Dashboard
            </span>{" "}
            for Agencies and Contacts
          </h1>
          <p className="text-base text-gray-700">
            Securely access agency data, browse employee contacts, and manage
            your daily usage with a streamlined, login-protected dashboard.
          </p>
          <Separator />
        </div>
        <div className="flex gap-4">
          <Button size={"lg"}>
            <BookUser />
            <Link href={"/signup"} className="hover:underline">
              View Contacts
            </Link>
          </Button>
          <Button size={"lg"}>
            <Building2 />
            <Link href={"/signup"} className="hover:underline">
              View Agencies
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
