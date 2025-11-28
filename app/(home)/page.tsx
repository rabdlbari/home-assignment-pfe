import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookUser, Building2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col h-full gap-4 justify-center items-center">
        <div className="text-center sm:w-3xl space-y-4 px-4">
          <h1 className="lg:text-6xl text-5xl text-center font-extrabold text-balance">
            A Simple{" "}
            <span id="dashboard-text" className="text-transparent">
              Dashboard
            </span>{" "}
            for Agencies and Contacts
          </h1>
          <p className="text-base text-muted-foreground">
            Securely access agency data, browse employee contacts, and manage
            your daily usage with a streamlined, login-protected dashboard.
          </p>
          <Separator />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size={"lg"}>
            <BookUser />
            <Link href={"/contacts"} className="hover:underline">
              View Contacts
            </Link>
          </Button>
          <Button size={"lg"}>
            <Building2 />
            <Link href={"/agencies"} className="hover:underline">
              View Agencies
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
