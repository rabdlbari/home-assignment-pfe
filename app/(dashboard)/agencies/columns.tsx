"use client";
import { timeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Agency = {
  name: string;
  state: string;
  state_code: string;
  type: string;
  population: string;
  website: string;
  total_schools: string;
  total_students: string;
  mailing_address: string;
  grade_span: string;
  locale: string;
  csa_cbsa: string;
  domain_name: string;
  physical_address: string;
  phone: string;
  status: string;
  student_teacher_ratio: string;
  supervisory_union: string;
  county: string;
  created_at: string;
  updated_at: string;
  id: string;
};

export const columns: ColumnDef<Agency>[] = [
  {
    accessorKey: "id",
    header: "ID",
    // cell: ({ row }) => {
    //   return <div className="w-[10ch] truncate">{row.getValue("id")}</div>;
    // },
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "county", header: "County" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "state_code", header: "State Code" },
  { accessorKey: "population", header: "Population" },
  { accessorKey: "type", header: "Type" },
  //   { accessorKey: "total_schools", header: "Schools" },
  //   { accessorKey: "total_students", header: "Students" },
  //   { accessorKey: "locale", header: "Locale" },
  //   { accessorKey: "phone", header: "Phone" },
  {
    accessorKey: "website",
    header: "Website",
    cell({ row }) {
      const website = row.getValue("website") as string;
      return (
        <Link href={website} className="w-[10ch] hover:underline truncate">
          {website}
        </Link>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      return <div>{timeAgo(row.getValue("created_at"))}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      return <div>{timeAgo(row.getValue("updated_at"))}</div>;
    },
  },

  // Add more columns if needed
];
