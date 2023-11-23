import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import checkUserLogin from "./lib/checkUserLogin";
import { cookies } from "next/headers";

// TODO: Not DONE / It's Not Working

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const myCookie = cookieStore.get("connect.sid");

  if (!myCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard",
};
