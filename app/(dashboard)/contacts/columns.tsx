"use client";
import { timeAgo } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  email_type: string;
  contact_form_url: string;
  created_at: string;
  updated_at: string;
  agency_id: string;
  firm_id: string;
  department: string;
};

export const columns: ColumnDef<Contact>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "first_name", header: "First Name" },
  { accessorKey: "last_name", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "email_type", header: "Email Type" },
  { accessorKey: "contact_form_url", header: "Contact Form" },
  { accessorKey: "agency_id", header: "Agency ID" },
  { accessorKey: "firm_id", header: "Firm ID" },
  { accessorKey: "department", header: "Department" },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      return <>{timeAgo(row.getValue("created_at"))}</>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => {
      return <>{timeAgo(row.getValue("updated_at"))}</>;
    },
  },
];
