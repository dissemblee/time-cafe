import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedPaths = ["/", "/me", "/dashboard", "/profile"]

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  const isProtected = protectedPaths.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)
  )
  if (!isProtected) return NextResponse.next()

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}user`, {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
      },
      credentials: "include",
    })

    if (res.ok) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export const config = {
  matcher: ["/", "/me", "/dashboard/:path*", "/profile/:path*"],
}
