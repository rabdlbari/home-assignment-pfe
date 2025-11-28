import { readCsv } from "@/lib/readCsv";
import { DataTable } from "@/components/data-table";
import { columns, Agency } from "./columns";
import { agencies } from "@/data/data";

export default async function AgenciesPage() {
  const rows = agencies;

  const [header, ...data] = rows;
  const agenciesData: Agency[] = data.map((row) => {
    const obj: any = {};
    header.forEach((h: string, idx: number) => {
      obj[h] = row[idx];
    });
    return obj;
  });

  return (
    <div className="p-4 w-full max-w-screen overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4">Agencies</h1>
      <DataTable columns={columns} data={agenciesData} />
    </div>
  );
}
