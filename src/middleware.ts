import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { fetchWrapper } from "./utils/fetchWrapper";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("SCORETIPS::TOKEN");
  const signInURL = new URL("/auth/signin", request.url);
  const appURL = new URL("/", request.url);

  if (request.nextUrl.pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  if (!token) {
    if (request.nextUrl.pathname === "/auth/signin") {
      return NextResponse.next();
    }

    if(request.nextUrl.pathname === "/auth/signup") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }

  if (request.nextUrl.pathname === "/auth/signin") {
    return NextResponse.redirect(appURL);
  }

  //Validate token
  try {
    await fetchWrapper("auth/token-valid", {
      headers: { Authorization: `Bearer ${token.value}` },
    });
  } catch (error) {
    console.error("Error: ", error);
    const response = NextResponse.redirect(signInURL);
    response.cookies.delete("SCORETIPS::TOKEN");
    return response;
  }
}

export const config = {
  matcher: ["/:path*", "/auth/:path*"],
};
