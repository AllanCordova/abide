import { createMiddlewareClient } from "./database/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = [
    "/profile",
    "/devotionals/create",
    "/devotionals/my",
    "/devotionals/subscribed",
  ];

  const authRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);

    const currentPath = request.nextUrl.pathname + request.nextUrl.search;

    loginUrl.searchParams.set("callbackUrl", currentPath);

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
