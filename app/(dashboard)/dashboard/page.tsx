import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { readCsv } from "@/lib/readCsv";

type DashCardProps = {
  description: string;
  value: string | number;
};

export default async function Dashboard() {
  const agencies = await readCsv("./public/agencies_agency_rows.csv");
  const contacts = await readCsv("./public/contacts_contact_rows.csv");

  // Remove header row
  const agencyCount = agencies.length > 0 ? agencies.length - 1 : 0;
  const contactCount = contacts.length > 0 ? contacts.length - 1 : 0;

  const items: DashCardProps[] = [
    {
      description: "Total Agencies",
      value: agencyCount,
    },
    {
      description: "Total Contacts",
      value: contactCount,
    },
    {
      description: "Visited Contacts",
      value: "TODO",
    },
  ];

  return (
    <>
      <section className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-2">Dashboard:</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <Card key={idx} className="p-4">
              <CardHeader className="p-0">
                <CardDescription>{item.description}</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">
                  {item.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
