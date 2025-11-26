import { promises as fs } from "fs";
import path from "path";
import Papa from "papaparse";

export async function readCsv(relativePath: string) {
  const filePath = path.join(process.cwd(), relativePath);
  const fileContent = await fs.readFile(filePath, "utf8");

  const parsed = Papa.parse<string[]>(fileContent, {
    header: false,
    skipEmptyLines: true,
  });

  return parsed.data;
}
