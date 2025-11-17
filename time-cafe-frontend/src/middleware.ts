import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    try {
      const res = await fetch(`${req.nextUrl.origin}/api/user`);

      if (res.ok) {
        return NextResponse.next();
      } else {
        // return NextResponse.redirect(new URL("/login", req.url));
        console.log("User not authorized");
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
