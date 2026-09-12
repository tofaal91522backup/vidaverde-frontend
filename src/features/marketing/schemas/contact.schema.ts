import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),
  email: z.email("Enter a valid email address"),
  subject: z.enum([
    "online_classes",
    "immersion",
    "homestay",
    "travel_spanish",
    "other",
  ]),
  message: z.string().trim().min(1, "Enter a message"),
  programme: z.string().trim(),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;
