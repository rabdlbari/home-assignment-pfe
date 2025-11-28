import { readCsv } from "@/lib/readCsv";

export const agencies = await readCsv("public/agencies_agency_rows.csv");
export const contacts = await readCsv("public/contacts_contact_rows.csv");
