import { DataTable } from "@/components/contacts-data-table";
import { contacts } from "@/data/data";
import { columns, Contact } from "./columns";
import { shuffleRows } from "@/lib/utils";
import { cookies } from "next/headers";
import { DateCount } from "@/proxy";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";
import Link from "next/link";

const MAX_CONTACTS = 50;

export default async function ContactsPage() {
  const rows = contacts;

  const [header, ...data] = rows;
  shuffleRows(data);
  const contactsData: Contact[] = data.map((row) => {
    const obj: any = {};
    header.forEach((h: string, idx: number) => {
      obj[h] = row[idx];
    });
    return obj;
  });

  const cookieStore = await cookies();
  const cookie = cookieStore.get("contacts-limit");
  const today = new Date().getTime();

  const dateCount = cookie
    ? (JSON.parse(cookie.value) as DateCount)
    : { date: today, count: 0 };
  console.log(MAX_CONTACTS - dateCount.count);
  return (
    <div className="p-4 w-full max-w-screen overflow-hidden h-full">
      <h1 className="text-2xl font-semibold mb-4">Contacts:</h1>
      {dateCount.count <= 50 && dateCount.count >= 0 ? (
        <DataTable
          columns={columns}
          data={contactsData}
          remainingContacts={MAX_CONTACTS - dateCount.count}
        />
      ) : (
        <Alert variant="destructive" className="w-4xl m-auto">
          <Lock className="h-4 w-4" />
          <AlertTitle>Daily Limit Reached</AlertTitle>
          <AlertDescription>
            You have reached the maximum number of contacts allowed today.{" "}
            <a href="#">Upgrade your account</a> or wait until the next 24 hours
            for the limit to reset.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
