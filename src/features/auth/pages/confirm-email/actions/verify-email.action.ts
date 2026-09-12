"use server";

import type {
  VerifyEmailResponse,
  VerifyEmailState,
} from "@/features/auth/types/auth.types";
import { CreateSession } from "@/features/auth/utils/session";
import { env } from "@/lib/env";
import axios from "axios";

/**
 * `POST /student/registration/verify-email/`
 *
 * **Keno server action, client fetch na:** verify success-e backend puro login
 * payload dey (`access`/`refresh`/`role`/`profile`). Session httpOnly encrypted
 * cookie-te thake, ar oita **shudhu server theke** set kora jay. Client theke
 * dakle token ta hate peyeo kichu korar thakto na — user-ke abar sign in korte
 * bolte hoto, jeta puro orthohin.
 *
 * Key single-use ar expire hoy; invalid hole backend 400 dey. Tokhon
 * resend-verification (Step 4) diye notun link nite hobe.
 *
 * docs/bruno/student/registration/verify-email.bru
 */
export const VerifyEmailAction = async (
  key: string,
): Promise<VerifyEmailState> => {
  if (!key) {
    return { success: false, message: "No confirmation token provided." };
  }

  try {
    const { data } = await axios.post<VerifyEmailResponse>(
      `${env.BACKEND_URL}/student/registration/verify-email/`,
      { key },
      { withCredentials: true },
    );

    await CreateSession({
      user: {
        id: String(data.user?.pk),
        name: data.profile?.name || data.user?.username || "",
        email: data.user?.email ?? "",
        role: data.role,
      },
      accessToken: data.access,
      refreshToken: data.refresh,
    });

    return {
      success: true,
      redirectTo: "/dashboard/student",
      message: data.message || "Your email is confirmed. Welcome to Vida Verde.",
    };
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.[0]
      : undefined;

    return {
      success: false,
      message:
        message ||
        "Email confirmation failed. The link may be invalid or expired.",
    };
  }
};
