import { z } from "zod";

type SchemaOptions = {
  /** Create-e password lage; edit-e khali mane "bodlabo na" */
  requirePassword: boolean;
  /**
   * Account-ta age theke inactive. Backend doc: `PATCH {active: true}` shudhu
   * profile chalu kore, login (`User.is_active`) bondho-i thake — notun
   * password (`password_txt`) na dile admin sign in korte parbe na. Tai
   * reactivate korle password badhyotamulok.
   */
  wasInactive?: boolean;
};

export const AdminAccountSchema = ({
  requirePassword,
  wasInactive = false,
}: SchemaOptions) =>
  z
    .object({
      email: z.email("Enter a valid email address"),
      name: z.string().trim().min(1, "Name is required"),
      password: requirePassword
        ? z.string().min(6, "Password must be at least 6 characters")
        : z
            .string()
            .refine(
              (value) => !value || value.length >= 6,
              "Password must be at least 6 characters",
            ),
      role: z.enum(["master", "manager"]),
      active: z.boolean(),
    })
    .refine((values) => !(wasInactive && values.active && !values.password), {
      path: ["password"],
      message: "Set a new password to reactivate this account",
    });

export type AdminAccountFormValues = z.infer<
  ReturnType<typeof AdminAccountSchema>
>;
