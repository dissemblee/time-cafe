// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith("/admin")) {
//     try {

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
//         headers: {
//           cookie: req.headers.get("XSRF-TOKEN") ?? "",
//         },
//         credentials: "include",
//       });
//       console.log(res.status , res.statusText)
//       if (res.ok) {
//         return NextResponse.next();
//       } else {
//         return NextResponse.redirect(new URL("/login", req.url));
//       }
//     } catch {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
