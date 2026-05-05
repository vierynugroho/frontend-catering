import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("role")?.value;

  // console.log("[PROXY]", {
  //   pathname,
  //   hasToken: !!token,
  //   tokenValue: token?.substring(0, 20), // sebagian saja
  //   role,
  //   allCookies: request.cookies.getAll().map((c) => c.name),
  // });

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Public routes — selalu boleh diakses
  const publicRoutes = ["/customer/menu", "/login", "/register"];
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Root redirect
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url)); // ← fix
    }
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/customer/menu", request.url));
  }

  // Protected routes — wajib login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname); // bonus: simpan tujuan asal
    return NextResponse.redirect(loginUrl);
  }

  // Role guard
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/admin/:path*", "/customer/:path*"],
};