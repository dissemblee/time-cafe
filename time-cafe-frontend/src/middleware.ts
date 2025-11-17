import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware для защиты всех маршрутов /admin/*
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Только маршруты /admin/*
  if (pathname.startsWith("/admin")) {
    try {
      // Проверка авторизации на Laravel
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
        credentials: "include",
      });

      if (res.ok) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
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
