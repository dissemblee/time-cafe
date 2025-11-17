export const runtime = "nodejs";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") ?? "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
    headers: { cookie },
    credentials: "include",
  });

  if (!res.ok) {
    return new Response(null, { status: 401 });
  }

  return new Response(null, { status: 200 });
}
