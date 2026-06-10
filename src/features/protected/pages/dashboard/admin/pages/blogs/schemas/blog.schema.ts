import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional().default(""),
  image: z.string().optional().default(""),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;
