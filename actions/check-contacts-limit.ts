"use server";

import { DateCount } from "@/proxy";
import { cookies } from "next/headers";

const LIMIT = 50;

export async function checkDailyLimit() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("contacts-limit");

  const today = new Date().getTime();

  let data = cookie
    ? (JSON.parse(cookie.value) as DateCount)
    : { date: today, count: 0 };

  // New day → reset counter
  // if (data.date !== today) {
  //   data = { date: today, count: 0 };
  // }

  // Block user if exceeded
  if (data.count >= LIMIT) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Increment count
  data.count += 10;
  data.date = new Date().getTime();

  cookieStore.set("contacts-limit", JSON.stringify(data), {
    httpOnly: true,
    // path: "/dashboard",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return {
    allowed: true,
    remaining: LIMIT - data.count,
  };
}

// import { cookies } from "next/headers";

type LimitCookie = {
  count: number;
  time: number; // milliseconds
};

export async function updateLimitCookie() {
  const store = await cookies();
  const cookie = store.get("contacts-limit");

  const now = Date.now();

  let data: LimitCookie;

  if (!cookie) {
    // Create new cookie
    data = { count: 10, time: now };
  } else {
    // Parse & update

    const parsed = JSON.parse(cookie.value) as LimitCookie;
    // parsed.count += 10;
    data = {
      count: parsed.count + 10,
      time: now, // update timestamp
    };
  }

  // Save cookie
  store.set("contacts-limit", JSON.stringify(data), {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    // path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return data;
}
