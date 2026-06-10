import { z } from "zod";

export const PackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  classesCount: z.coerce.number().min(1, "Must have at least 1 class"),
  validityDays: z.coerce.number().min(1, "Validity must be at least 1 day"),
  isActive: z.boolean().default(true),
});

export type PackageFormValues = z.infer<typeof PackageSchema>;
