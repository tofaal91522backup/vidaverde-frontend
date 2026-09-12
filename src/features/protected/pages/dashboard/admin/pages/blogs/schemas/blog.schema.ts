import { z } from "zod";

/** docs/bruno/administrator/blogs.bru — free text na, fixed enum */
export const BLOG_CATEGORIES = [
  { value: "spanish_learning_tips", label: "Spanish Learning Tips" },
  { value: "ecuador_travel", label: "Ecuador Travel" },
  { value: "school_news", label: "School News" },
  { value: "student_stories", label: "Student Stories" },
  { value: "culture_and_language", label: "Culture & Language" },
] as const;

export const BLOG_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
] as const;

/**
 * docs/bruno/administrator/blogs.bru
 *
 * Read-only (form-e nai): `slug` auto-generate hoy `title_en` theke,
 * `reading_time` word count theke, `author` logged-in admin theke.
 * `published_at` ekbar-i stamp hoy — pore edit korleo bodlay na.
 */
export const BlogSchema = z.object({
  title_en: z.string().min(1, "English title is required"),
  title_es: z.string(),
  /** Khali dile backend `title_en` theke banay ar unique kore */
  slug: z.string(),
  excerpt_en: z.string(),
  excerpt_es: z.string(),
  /** Rich HTML */
  body_en: z.string(),
  body_es: z.string(),
  /** Prothom ta index thumbnail hisebe use hoy */
  image_urls: z.array(z.string()),
  category: z.enum([
    "spanish_learning_tips",
    "ecuador_travel",
    "school_news",
    "student_stories",
    "culture_and_language",
  ]),
  status: z.enum(["draft", "published"]),
  meta_title: z.string(),
  meta_description: z.string(),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;
