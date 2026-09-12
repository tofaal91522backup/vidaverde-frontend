import { z } from "zod";

export const LeadSchema = z.object({
  first_name: z.string().trim().min(1, "Enter your first name"),
  email: z.email("Enter a valid email address"),
  gdpr_consent: z
    .boolean()
    .refine((value) => value, "Email consent is required"),
});

export type LeadFormValues = z.infer<typeof LeadSchema>;
