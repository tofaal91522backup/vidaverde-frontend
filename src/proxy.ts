import { jwtVerify, type JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

type SessionPayload = JWTPayload & {
  user?: { role?: string };
};

const cookieName = process.env.SESSION_COOKIE_NAME ?? "__myapp_session";
const sessionSecret = process.env.SESSION_SECRET_KEY;

function dashboardHref(role?: string) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "STUDENT") return "/dashboard/student";
  return "/";
}

async function readSession(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(cookieName)?.value;
  if (!token || !sessionSecret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(sessionSecret),
      { algorithms: ["HS256"] },
    );
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

function signInRedirect(request: NextRequest) {
  return NextResponse.redirect(new URL("/auth/signin", request.url));
}

/**
 * Route-level auth gate. API authorization remains the backend's job; this
 * prevents unauthenticated and wrong-role users from rendering dashboards.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSession(request);
  const role = session?.user?.role;

  if (pathname.startsWith("/dashboard/admin")) {
    if (!session) return signInRedirect(request);
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL(dashboardHref(role), request.url));
    }
  }

  if (pathname.startsWith("/dashboard/student")) {
    if (!session) return signInRedirect(request);
    if (role !== "STUDENT") {
      return NextResponse.redirect(new URL(dashboardHref(role), request.url));
    }
  }

  // A signed-in visitor should not return to the login form.
  if (pathname === "/auth/signin" && session) {
    return NextResponse.redirect(new URL(dashboardHref(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin"],
};
