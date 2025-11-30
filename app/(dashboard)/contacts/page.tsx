import { DataTable } from "@/components/contacts-data-table";
import { contacts } from "@/data/data";
import { columns, Contact } from "./columns";
import { getRemainingTime, shuffleRows } from "@/lib/utils";
import { cookies } from "next/headers";
import { DateCount } from "@/proxy";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

const MAX_CONTACTS = 50;

export default async function ContactsPage() {
  const rows = contacts;

  const [header, ...data] = rows.slice(0, MAX_CONTACTS + 1);
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
  const timeRemaining = getRemainingTime(new Date(dateCount.date));
  return (
    <div className="p-4 w-full max-w-screen overflow-hidden h-full">
      <h1 className="text-2xl font-semibold mb-2">Contacts:</h1>
      {dateCount.count < MAX_CONTACTS && dateCount.count >= 0 ? (
        <DataTable
          columns={columns}
          data={contactsData}
          time={dateCount.date as number}
          count={dateCount.count}
        />
      ) : (
        // <div className="h-full">
        <Alert variant="destructive" className="mx-auto w-fit">
          <AlertTitle className="flex flex-col">
            <Lock className="h-10 w-10 mx-auto" />
            <h1 className="text-2xl text-center">Daily Limit Reached</h1>
          </AlertTitle>
          <AlertDescription className="">
            <p className="w-fit text-center text-xl text-balance">
              You have reached the maximum number of contacts allowed today.
              Upgrade your account or wait until{" "}
              <span className="font-semibold">{timeRemaining}</span> for the
              limit to reset.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
