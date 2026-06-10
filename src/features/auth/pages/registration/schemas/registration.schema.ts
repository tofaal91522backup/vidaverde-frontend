import { z } from "zod";

export const RegistrationSchema = z
  .object({
    username: z.string().min(2, "please enter your name"),
    email: z
      .string()
      .email("please enter a valid email")
      .min(1, "please enter a valid email"),
    password1: z.string().min(6, "Password must be at least 6 characters"),
    password2: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });
