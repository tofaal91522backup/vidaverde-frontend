"use server";

import {
  isAuthSuccess,
  type RegistrationType,
  type StudentRegistrationPayload,
  type StudentRegistrationResponse,
} from "@/features/auth/types/auth.types";
import { CreateSession } from "@/features/auth/utils/session";
import { env } from "@/lib/env";
import HandleError from "@/utils/error-handle";
import { validateForm } from "@/utils/validate-form";
import axios from "axios";
import { RegistrationSchema } from "../schemas/registration.schema";

function getRegistrationErrors(error: unknown): RegistrationType {
  if (axios.isAxiosError(error) && error.response?.data) {
    const data = error.response.data;

    return {
      errors: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        phone_number: data.phone_number,
        // Vul IANA zone dile backend ekhane 400 dey.
        timezone: data.timezone,
        current_spanish_level: data.current_spanish_level,
        // Django-r password validator (email-er shathe mil, common password,
        // shudhu number) ekhane ashe — client-side min(8) dhorte parbe na.
        password1: data.password1,
        password2: data.password2,
        formError:
          data.non_field_errors ||
          data.detail ||
          data.message || ["Registration failed. Please try again."],
      },
    };
  }

  return HandleError(error);
}

/** Khali string backend-e pathano jabe na — `timezone: ""` dile 400. */
function omitEmpty(payload: StudentRegistrationPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
}

/**
 * `POST /student/registration/` — `User` (is_student) ar `Student` profile
 * ek shathe toiri kore.
 *
 * Age `POST /rest-auth/registration/` e jeto. Oi path ekhon-o ache ar ek-i view
 * e jay, kintu canonical ta `/student/registration/`.
 *
 * **Response duita shape-er ekta hote pare**, backend-er `EMAIL_VERIFICATION_REQUIRED`
 * er upor. Frontend oi env dekhte pay na, tai ja-i ashuk duitai handle kora hoy:
 *
 * - token ache -> shoja session banai, user logged in
 * - token nai -> verify-email page-e pathai, email shoho (resend-er jonno lagbe)
 */
export const RegistrationAction = async (
  previousState: RegistrationType,
  formData: FormData,
): Promise<RegistrationType> => {
  const validationErrors = validateForm(RegistrationSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const payload: StudentRegistrationPayload = {
      email: String(formData.get("email")),
      password1: String(formData.get("password1")),
      password2: String(formData.get("password2")),
      first_name: String(formData.get("first_name")),
      last_name: String(formData.get("last_name") ?? ""),
      country: String(formData.get("country") ?? ""),
      phone_number: String(formData.get("phone_number") ?? ""),
      timezone: String(formData.get("timezone") ?? ""),
      current_spanish_level:
        (formData.get(
          "current_spanish_level",
        ) as StudentRegistrationPayload["current_spanish_level"]) || undefined,
    };

    const { data } = await axios.post<StudentRegistrationResponse>(
      `${env.BACKEND_URL}/student/registration/`,
      omitEmpty(payload),
      { withCredentials: true },
    );

    // Verification off thakle backend login-er moto puro payload dey. Tokhon
    // user-ke abar sign in korte bola mane kono karon chara friction.
    if (isAuthSuccess(data)) {
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
        success_text: data.message || "Welcome to Vida Verde.",
        errors: {},
      };
    }

    return {
      success: true,
      verificationRequired: true,
      email: data.email,
      success_text:
        data.message ||
        "Almost there. Check your inbox and click the link to activate your account.",
      errors: {},
    };
  } catch (error) {
    return getRegistrationErrors(error);
  }
};
