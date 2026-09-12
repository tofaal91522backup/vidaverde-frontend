import { z } from "zod";

/** Backend-er `spanish_level` enum — docs/bruno/public/checkout.bru */
export { SPANISH_LEVEL_OPTIONS } from "@/constants/spanish-levels";

/**
 * Booking step 4-er student details.
 *
 * Teacher/package UUID ar slot alada state-e thake — oigula step 1-3 e already
 * validate hoye geche, tai ei schema shudhu form field niye.
 *
 * docs/bruno/public/checkout.bru
 */
export const CheckoutDetailsSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone_number: z.string(),
  country: z.string(),
  spanish_level: z.enum([
    "none",
    "beginner",
    "intermediate",
    "upper_intermediate",
    "advanced",
  ]),
});

export type CheckoutDetailsValues = z.infer<typeof CheckoutDetailsSchema>;
