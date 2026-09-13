"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { Session } from "@/features/auth/types/auth.types";

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET_KEY);
const SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME ?? "__myapp_session";
const SESSION_MAX_AGE_SECONDS =
  Number(env.SESSION_MAX_AGE_DAYS ?? 7) * 24 * 60 * 60;

export async function CreateSession(payload: Session): Promise<void> {
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${env.SESSION_MAX_AGE_DAYS}d`)
    .sign(encodedKey);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    // Secure cookies are required in production, but block local HTTP sign-in.
    secure: !env.isDevelopment,
    maxAge: SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.log(error);
    redirect("/");
  }
}

/**
 * Cookie muche `/` te pathiye dey.
 *
 * ⚠️ `redirect()` throw kore, tai **ei call-er por-er kono code chole na**.
 * Client component theke dakle oita fandh — cache clear, local state reset,
 * kichu-i hobe na. Client-er jonno `clearSession()` use korte hobe.
 *
 * Eta ekhon shudhu axios interceptor gulo dake, jekhane redirect-i chai.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/");
}

/**
 * Shudhu cookie muche — **redirect kore na**.
 *
 * Client theke sign out korar jonno eta. Redirect-ta caller kore, tai
 * tar age React Query cache clear kora ar navbar-er local user state reset
 * kora jay — `destroySession()` diye oigulor kono ta-i hoto na.
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
//
export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) throw new Error("Session not found");

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await CreateSession(newPayload);
}

/**
 * Session-er user-tuku — **redirect na kore**.
 *
 * `getSession()` cookie verify fail korle `redirect("/")` kore. Protected
 * layout-e seta thik, kintu marketing navbar-er jonno **bipojjonok**: "/" nijei
 * ekta marketing page, mane noshto cookie thakle redirect loop hoto.
 *
 * Ar eta client theke daka hoy (navbar `"use client"`), tai puro session na
 * diye shudhu ja dekhate lage seta-i fire deওয়া hoy — access/refresh token
 * browser porjonto pathanor kono karon nai.
 */
export async function readNavbarUser(): Promise<Session["user"] | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify<Session>(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload?.user ?? null;
  } catch {
    return null;
  }
}
