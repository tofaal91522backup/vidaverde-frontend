import { SPANISH_LEVEL_VALUES } from "@/constants/spanish-levels";
import { z } from "zod";

/**
 * `POST /student/registration/` er body.
 *
 * docs/bruno/student/registration/register.bru
 *
 * ⚠️ **`username` nai.** Age eta pathano hoto, kintu notun spec-e oi field-i
 * nei — `first_name` (required) ar `last_name` eseche.
 *
 * Optional field gula `""` allow kore, karon khali `<input>` theke FormData
 * `""` pathay. Backend-e `""` pathano **jabe na** — `timezone: ""` ba
 * `current_spanish_level: ""` dile 400. Tai action-e pathanor age khali value
 * gula chhente fela hoy.
 */
export const RegistrationSchema = z
  .object({
    email: z
      .string()
      .min(1, "please enter a valid email")
      .email("please enter a valid email"),

    /*
      Live API-te probe kora asol niyom:
        < 8 okkhor   -> "Ensure this field has at least 8 characters."
        shudhu digit -> "This password is entirely numeric."
        common       -> "This password is too common."

      Prothom duita ekhane-i dhora jay, tai server-e jawar age-i bola hoy.
      "Common password" er list-ta Django-r bhitore, sheta shudhu server-e
      dhora porbe — `PasswordRequirements` shekhane khali jaaniye rakhe.
    */
    password1: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((v) => !/^\d+$/.test(v), "Password cannot be only numbers"),
    password2: z.string().min(1, "Please confirm your password"),

    first_name: z.string().min(1, "please enter your first name"),
    last_name: z.string().optional(),
    country: z.string().optional(),
    phone_number: z.string().optional(),

    // IANA naam. Form-e hidden field hisebe browser-er zone boshbe (Step 2).
    // Na pathale backend school-er zone dhore ney.
    timezone: z.string().optional(),

    current_spanish_level: z
      .union([z.enum(SPANISH_LEVEL_VALUES), z.literal("")])
      .optional(),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

export type RegistrationValues = z.infer<typeof RegistrationSchema>;
