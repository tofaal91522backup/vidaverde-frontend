import { jwtVerify, type JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

type SessionPayload = JWTPayload & {
  user?: { role?: string };
};

const cookieName = process.env.SESSION_COOKIE_NAME ?? "__myapp_session";
const sessionSecret = process.env.SESSION_SECRET_KEY;

/**
 * Logged-in user auth page-e gele kothay pathabo.
 *
 * ⚠️ `TEACHER` role backend ekhon fire dite pare (login.bru, 2026-09-05), kintu
 * teacher-er kono frontend portal **nai** — tai `/`. Teacher portal banale
 * ekhane oita joda korte hobe.
 */
function dashboardHref(role?: string) {
  if (role === "ADMIN") return "/dashboard/admin";
  if (role === "STUDENT") return "/dashboard/student";
  return "/";
}

async function readSession(
  request: NextRequest,
): Promise<SessionPayload | null> {
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
 * Logged-in user-ke jei auth page gulo theke ferano hoy.
 *
 * `/auth/email/confirm/...` **ichchha kore bad** — email confirm korte giye keu
 * jodi already logged in thake (onno tab-e sign in kora, ba verification off
 * thakay registration-i session baniye diyeche), take ferale link-ta **kokhono
 * kaj-i korto na** ar tar email chirodin unverified theke jeto.
 *
 * `/auth/password/reset/confirm/...` o bad — logged-in obosthay-o keu email-er
 * reset link chapte pare.
 */
const AUTH_PAGES_TO_BOUNCE = [
  "/auth/signin",
  "/auth/registration",
  "/auth/forget-password",
  "/auth/verify-email",
];

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

  // A signed-in visitor should not return to the login form -- or to register,
  // reset or "check your email", which are all meaningless with a session.
  if (session && AUTH_PAGES_TO_BOUNCE.includes(pathname)) {
    return NextResponse.redirect(new URL(dashboardHref(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Confirm/reset link gulo ichchha kore matcher-er bahire — upore karon lekha.
  matcher: [
    "/dashboard/:path*",
    "/auth/signin",
    "/auth/registration",
    "/auth/forget-password",
    "/auth/verify-email",
  ],
};
