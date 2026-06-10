"use server";

import { RegistrationType } from "@/features/auth/types/auth.types";
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
        username: data.username,
        password1: data.password1,
        password2: data.password2,
        formError:
          data.non_field_errors ||
          data.detail ||
          data.message ||
          ["Registration failed. Please try again."],
      },
    };
  }

  return HandleError(error);
}

export const RegistrationAction = async (
  previousState: RegistrationType,
  formData: FormData
): Promise<RegistrationType> => {
  const validationErrors = validateForm(RegistrationSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const { data } = await axios.post(
      `${env.BACKEND_URL}/rest-auth/registration/`,
      {
        username: formData.get("username"),
        email: formData.get("email"),
        password1: formData.get("password1"),
        password2: formData.get("password2"),
      },
      { withCredentials: true }
    );

    return {
      success: true,
      success_text:
        data?.detail ||
        "Registration successful. Please check your email to verify your account.",
      errors: {},
    };
  } catch (error) {
    return getRegistrationErrors(error);
  }
};
