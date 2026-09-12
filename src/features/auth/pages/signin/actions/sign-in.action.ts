"use server";
import { validateForm } from "@/utils/validate-form";
import axios from "axios";
import { LoginSchema } from "../schemas/sign-in.schema";

import { env } from "@/lib/env";
import { CreateSession } from "@/features/auth/utils/session";
import HandleError from "@/utils/error-handle";
import { LoginType } from "@/features/auth/types/auth.types";

export const SignInAction = async (
  previousState: LoginType,
  formData: FormData,
): Promise<LoginType> => {
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const base = env.BACKEND_URL;
    const { data } = await axios.post(
      `${base}/rest-auth/login/`,
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    await CreateSession({
      user: {
        id: String(data?.user?.pk),
        name: data?.user?.username ?? "",
        email: data?.user?.email ?? "",
        role: data?.role,
        // `/administrator/admins/` is master-only. Keep only the documented
        // admin profile values; never trust an arbitrary profile role.
        adminRole:
          data?.role === "ADMIN" &&
          (data?.profile?.role === "master" || data?.profile?.role === "manager")
            ? data.profile.role
            : undefined,
      },
      accessToken: data?.access,
      refreshToken: data?.refresh,
    });

    return { success: true, errors: {} };
  } catch (error) {
    return HandleError(error);
  }
};
