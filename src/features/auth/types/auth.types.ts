import type { ApiResponse } from "@/types/api-response.type";
import type { SpanishLevel } from "@/types/domain.type";

export type LoginType = {
  success?: boolean;
  status?: string;
  accessToken?: string;
  redirectTo?: string;
  errors: {
    email?: string[];
    password?: string[];
    formError?: string[];
  };
};

export type RegistrationType = {
  success?: boolean;
  success_text?: string;
  /** Session toiri hoye gele kothay pathabo. Verification lagle undefined. */
  redirectTo?: string;
  /**
   * Backend `EMAIL_VERIFICATION_REQUIRED=True` hole token dey na — tokhon eta
   * `true` hoy ar user-ke verify-email page-e pathate hobe.
   */
  verificationRequired?: boolean;
  /** `verificationRequired` hole resend-er jonno ei email ta lagbe. */
  email?: string;
  errors: {
    email?: string[];
    first_name?: string[];
    last_name?: string[];
    country?: string[];
    phone_number?: string[];
    timezone?: string[];
    current_spanish_level?: string[];
    password1?: string[];
    password2?: string[];
    formError?: string[];
  };
};

/* -------------------------------------------------------------------------- */
/* Registration + email verification                                           */
/* docs/bruno/student/registration/                                            */
/* -------------------------------------------------------------------------- */

export type AuthRole = "ADMIN" | "STUDENT" | "TEACHER";

/** Login/verify response-er `user` block — Django `User`, `Student` row na. */
export type AuthUser = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

/**
 * Login/verify response-er `profile` block.
 *
 * STUDENT hole `Student` row, ADMIN hole admin profile (`role` shoho). Tai
 * field gula optional — kon role ta ashbe seta response-er `role` dekhe bojha jay.
 */
export type AuthProfile = {
  id: string;
  name: string;
  profile_img_url?: string;
  country?: string;
  timezone?: string;
  current_spanish_level?: SpanishLevel;
  active?: boolean;
  /** Shudhu ADMIN profile-e. `/administrator/admins/` master-only. */
  role?: "master" | "manager";
};

/**
 * `POST /rest-auth/login/`, `POST /student/registration/verify-email/`, ar
 * `EMAIL_VERIFICATION_REQUIRED=False` thakle `POST /student/registration/` —
 * tinta-i **ek-i payload** fire dey.
 *
 * Ei type-ta ek jaygay rakha, karon verify-email success mane user logged in —
 * take abar "sign in koro" bola mane kono karon chara friction.
 */
export type AuthSuccessResponse = ApiResponse & {
  access: string;
  refresh: string;
  user: AuthUser;
  role: AuthRole;
  profile: AuthProfile;
  message?: string;
};

/**
 * `POST /student/registration/` er request body.
 *
 * docs/bruno/student/registration/register.bru
 */
export type StudentRegistrationPayload = {
  /** Save-e lowercase hoy. Guest checkout-e banano account-er email dile 400. */
  email: string;
  /** Minimum 8. Django AUTH_PASSWORD_VALIDATORS-o chole. */
  password1: string;
  /** `password1` er shathe hubohu milte hobe. */
  password2: string;
  first_name: string;
  last_name?: string;
  country?: string;
  phone_number?: string;
  /** IANA naam. Default `"America/Guayaquil"` (school-er). Vul zone -> 400. */
  timezone?: string;
  /** Default `"none"`. */
  current_spanish_level?: SpanishLevel;
};

/**
 * `EMAIL_VERIFICATION_REQUIRED=True` hole registration ei ta dey — **token nai**.
 * Account ache kintu login korte parbe na (login 403 dibe) jotokhon na link click hoy.
 */
export type RegistrationPendingResponse = ApiResponse & {
  email_verification_required: true;
  email: string;
  message: string;
};

/**
 * `POST /student/registration/` duita shape-er ekta dey, backend-er
 * `EMAIL_VERIFICATION_REQUIRED` env-er upor depend kore.
 *
 * Frontend oi env janena — tai **hardcode kora jabe na**, response dekhe
 * `isAuthSuccess()` diye narrow korte hobe.
 */
export type StudentRegistrationResponse =
  | AuthSuccessResponse
  | RegistrationPendingResponse;

/**
 * Registration response-e token elo kina.
 *
 * `true` -> `CreateSession` dako, user logged in.
 * `false` -> verify-email page-e patha.
 */
export function isAuthSuccess(
  res: StudentRegistrationResponse,
): res is AuthSuccessResponse {
  return "access" in res && Boolean(res.access);
}

/**
 * `POST /student/registration/verify-email/` — key thik hole **puro login
 * payload** dey. Invalid/expired key -> 400. Key single-use.
 */
export type VerifyEmailResponse = AuthSuccessResponse;

/**
 * `POST /student/registration/resend-email/`
 *
 * ⚠️ Email ache ki nai, already verified ki na — **shob khetre ek-i 200 ar ek-i
 * message**. Iccha kore, jate keu ei endpoint diye kon email registered seta ber
 * korte na pare. Tai UI-te "ei email nai" jatiyo kichu dekhano **jabe na**.
 */
export type ResendVerificationResponse = ApiResponse & {
  message: string;
};

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    /** Present only for an ADMIN login; used for master-only dashboard UI. */
    adminRole?: "master" | "manager";
  };
  accessToken: string;
  refreshToken: string;
};

export type EmailSendType = {
  errors: {
    email?: string[];
    formError?: string[];
  };
  success_text?: string;
  success?: boolean;
};
export type ResetPasswordType = {
  errors: {
    new_password1?: string[];
    new_password2?: string[];
    uid?: string[];
    token?: string[];
    formError?: string[];
  };
  success?: boolean;
};

export type resetPasswordProps = {
  params: {
    uid: string;
    token: string;
  };
};

/**
 * `VerifyEmailAction` er return.
 *
 * Action-ta success hole **session baniye** fire ashe, tai page-er kaj shudhu
 * `redirectTo` e pathano — user tokhon already logged in.
 */
export type VerifyEmailState = {
  success: boolean;
  /** Success hole kothay pathabo. */
  redirectTo?: string;
  /** Backend-er nijer message — success ba error duitatei. */
  message: string;
};
