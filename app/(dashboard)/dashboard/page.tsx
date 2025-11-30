import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { agencies, contacts } from "@/data/data";
import { cn, getRemainingTime } from "@/lib/utils";
import { DateCount } from "@/proxy";
import { ClockAlert } from "lucide-react";
import { cookies } from "next/headers";

type DashCardProps = {
  description: string;
  value: string | number;
  badge?: string;
  footer?: string;
};

export default async function Dashboard() {
  const agencyCount = agencies.length > 0 ? agencies.length - 1 : 0;
  const contactCount = contacts.length > 0 ? contacts.length - 1 : 0;

  const cookie = (await cookies()).get("contacts-limit");
  const cookieData = JSON.parse(cookie?.value as string) as DateCount;
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
      value: cookieData.count,
      badge:
        cookieData.count >= 0 && cookieData.count < 50
          ? "Granted"
          : "Restricted",
      footer: `Remaining time: ${getRemainingTime(new Date(cookieData.date))}`,
    },
  ];

  return (
    <>
      <section className="flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-2">Dashboard:</h1>
        <p className="text-sm text-gray-500 mb-4">
          Last updated: {new Date().toLocaleString()}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <Card key={idx} className="p-4">
              <CardContent>
                <CardHeader className="p-0">
                  <CardDescription>{item.description}</CardDescription>
                  <CardTitle className="text-3xl font-bold tabular-nums">
                    {item.value}
                  </CardTitle>
                  {item.badge && (
                    <CardAction>
                      <Badge
                        variant="outline"
                        className={cn(
                          item.badge === "Granted"
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {/* <IconTrendingUp /> */}
                        {item.badge}
                      </Badge>
                    </CardAction>
                  )}
                </CardHeader>
                {item.footer &&
                  !(cookieData.count >= 0 && cookieData.count < 50) && (
                    <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <ClockAlert className="w-4 h-4" />
                      <span>{item.footer}</span>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
