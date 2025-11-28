import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/contacts(.*)",
  "/agencies(.*)",
]);

export type DateCount = {
  date: string | number;
  count: number;
};

const MAX_AGE = 60; //3600 * 24;

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const res = NextResponse.next();
  const cookie = req.cookies.get("contacts-limit");
  const today = new Date().getTime();

  if (!cookie) {
    const data = { date: today, count: 0 };
    res.cookies.set("contacts-limit", JSON.stringify(data), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // path: "/",
      maxAge: MAX_AGE,
    });

    return res;
  }

  let data: DateCount;
  try {
    data = JSON.parse(cookie.value) as DateCount;
  } catch {
    data = { date: today, count: 0 };
  }
  if (req.nextUrl.pathname === "/contacts" && req.method === "GET") {
    if (data.count < 50) data.count += 10;
    console.log("Page Refreshed");
    res.cookies.set("contacts-limit", JSON.stringify(data), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // path: "/contacts",
      maxAge: MAX_AGE,
    });
  }

  if (data.date !== today) {
    // data = { date: today, count: 0 };
    res.cookies.set("contacts-limit", JSON.stringify(data), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // path: "/contacts",
      maxAge: 60 * 60 * 24,
    });
  }

  return res;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/dashboard/:path*",
    "/contacts/:path*",
  ],
};
