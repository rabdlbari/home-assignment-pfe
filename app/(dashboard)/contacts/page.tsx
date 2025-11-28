import { DataTable } from "@/components/contacts-data-table";
import { contacts } from "@/data/data";
import { columns, Contact } from "./columns";

export default async function ContactsPage() {
  const rows = contacts;

  const [header, ...data] = rows;
  const contactsData: Contact[] = data.map((row) => {
    const obj: any = {};
    header.forEach((h: string, idx: number) => {
      obj[h] = row[idx];
    });
    return obj;
  });

  return (
    <div className="p-4 w-full max-w-screen overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Contacts:</h1>
      <DataTable columns={columns} data={contactsData} />
    </div>
  );
}
