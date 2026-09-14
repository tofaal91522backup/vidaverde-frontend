export const env: {
  BACKEND_URL: string | undefined;
  NEXT_PUBLIC_BACKEND_URL: string | undefined;
  SESSION_SECRET_KEY: string | undefined;
  SESSION_COOKIE_NAME: string | undefined;
  SESSION_MAX_AGE_DAYS: string | undefined;
  /** Google Identity Services-er client id. Public — secret ta shudhu backend-e. */
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: string | undefined;
  isDevelopment: boolean;
} = {
  BACKEND_URL: process.env.BACKEND_URL,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_DAYS: process.env.SESSION_MAX_AGE_DAYS,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  isDevelopment: process.env.NODE_ENV === "development",
};
