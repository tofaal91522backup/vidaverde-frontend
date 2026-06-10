import { z } from "zod";

export const TeacherSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().min(1, "Bio is required"),
  photo: z.string().optional().default(""),
  specialisations: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  schedule: z.record(z.string(), z.array(z.string())).default({}),
});

export type TeacherFormValues = z.infer<typeof TeacherSchema>;
