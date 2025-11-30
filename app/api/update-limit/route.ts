import { DateCount } from "@/proxy";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies(); // ✔ use this. It is writable.

  const cookie = store.get("contacts-limit");
  // const now = Date.now();

  let data: DateCount;

  if (!cookie) {
    data = { date: new Date().getTime(), count: 10 };
  } else {
    const parsed = JSON.parse(cookie.value) as DateCount;
    data = {
      count: parsed.count,
      date: new Date().getTime(),
    };
    if (data.count < 50) data.count += 10;
  }

  store.set({
    name: "contacts-limit",
    value: JSON.stringify(data),
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json(data);
}
