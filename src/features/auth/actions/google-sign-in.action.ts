"use server";

import { CreateSession } from "@/features/auth/utils/session";
import type { AuthRole, LoginType } from "@/features/auth/types/auth.types";
import { env } from "@/lib/env";
import HandleError from "@/utils/error-handle";
import axios from "axios";

/**
 * `POST /rest-auth/google/` er response.
 *
 * ⚠️ Eta `/rest-auth/login/` er shape **na**. dj-rest-auth nijer payload dey:
 * `role` nai, `profile` nai — shudhu token ar User row.
 * docs/bruno/authentication/google oauth.bru
 */
type GoogleAuthResponse = {
  access: string;
  refresh: string;
  user: {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
};

type ResolvedRole = {
  role: AuthRole | undefined;
  /** Student hole tar nijer profile-er naam — Google-er naam-er cheye bhalo */
  profileName?: string;
};

/**
 * Google login-e backend role bole na, tai jigges kore ber korte hoy.
 *
 * `GET /student/me/` 200 dile STUDENT; non-student hole 403 ar message
 * "User is not a student". Tokhon ekta admin-only endpoint-e ekbar dekha hoy.
 * Kono ta-i na milé role `undefined` — tokhon dashboard-e na pathiye homepage-e
 * pathano hoy, karon vul dashboard-e pathale shudhu 403-er dewal-e giye thamto.
 */
async function resolveRole(
  base: string,
  accessToken: string,
): Promise<ResolvedRole> {
  const auth = {
    headers: { Authorization: `Bearer ${accessToken}` },
    timeout: 8000,
  };

  try {
    const { data } = await axios.get(`${base}/student/me/`, auth);
    return { role: "STUDENT", profileName: data?.profile?.name };
  } catch {
    // Student na — tar mane admin hote pare
  }

  try {
    await axios.get(`${base}/administrator/packages/`, auth);
    return { role: "ADMIN" };
  } catch {
    return { role: undefined };
  }
}

/**
 * Google Identity Services-er `id_token` niye session banay.
 *
 * Password login-er moto `useActionState` diye cholе na — GIS-er callback
 * theke dakte hoy, tai eta ekta shadharon async function, FormData action na.
 */
export async function GoogleSignInAction(idToken: string): Promise<LoginType> {
  if (!idToken) {
    return { errors: { formError: ["Google did not return a token."] } };
  }

  try {
    const base = env.BACKEND_URL;

    const { data } = await axios.post<GoogleAuthResponse>(
      `${base}/rest-auth/google/`,
      { id_token: idToken },
      { headers: { "Content-Type": "application/json" }, timeout: 15000 },
    );

    const { role, profileName } = await resolveRole(String(base), data.access);

    await CreateSession({
      user: {
        id: String(data.user?.pk),
        // `username` asole email — password login-er moto ekhane-o oita
        // naam-er jaygay boshale sidebar-e email dekhato
        name:
          profileName ||
          [data.user?.first_name, data.user?.last_name]
            .filter(Boolean)
            .join(" ") ||
          "",
        email: data.user?.email ?? "",
        // `Session.user.role` ekta required string. Khali string mane "jana
        // jay ni" — ADMIN/STUDENT kono guard-er shathe-i milbe na, tai kono
        // dashboard khule jabe na.
        role: role ?? "",
        // Google login-e admin-er `master`/`manager` bhag jana jay na, tai
        // kono adminRole dewa hoy na — master-only screen gula lukono thakbe
      },
      accessToken: data.access,
      refreshToken: data.refresh,
    });

    const redirectTo =
      role === "ADMIN"
        ? "/dashboard/admin"
        : role === "STUDENT"
          ? "/dashboard/student"
          : "/";

    return { success: true, redirectTo, errors: {} };
  } catch (error) {
    return HandleError(error);
  }
}
