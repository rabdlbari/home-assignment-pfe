import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { encryptCookie } from "./lib/encryption";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/contacts(.*)",
  "/agencies(.*)",
]);

export type DateCount = {
  date: string | number; // YYYY-MM-DD
  count: number;
};

const MAX_AGE = 24 * 3600; // 1 minute for testing

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  const res = NextResponse.next({
    headers: { "x-middleware-cache": "no-cache" },
  });

  const cookie = req.cookies.get("contacts-limit");
  let data: DateCount;

  if (!cookie) {
    data = { date: Date.now(), count: 0 };
  } else {
    try {
      data = JSON.parse(cookie.value);
    } catch {
      data = { date: Date.now(), count: 0 };
    }
  }

  if (req.nextUrl.pathname === "/contacts" && req.method === "GET") {
    if (data.count < 50) {
      data.count += 10;
      data.date = Date.now();
    }
  }
  const encryptedData = encryptCookie(JSON.stringify(data));
  res.cookies.set("contacts-limit", JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
  });

  return res;
});
