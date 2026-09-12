import { z } from "zod";

/** `password` is blank during edit unless the master intentionally resets it. */
export const AdminAccountSchema = (requirePassword: boolean) =>
  z.object({
    email: z.email("Enter a valid email address"),
    name: z.string().min(1, "Name is required"),
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
  });

export type AdminAccountFormValues = z.infer<
  ReturnType<typeof AdminAccountSchema>
>;
