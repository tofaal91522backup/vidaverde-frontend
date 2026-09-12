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
  errors: {
    email?: string[];
    username?: string[];
    password1?: string[];
    password2?: string[];
    formError?: string[];
  };
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
