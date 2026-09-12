import type { PublicLanguage } from "@/features/marketing/constants/public-api";
import type { ApiResponse, PaginatedResponse } from "@/types/api-response.type";
import type { SpanishLevel, WeekDay } from "@/types/domain.type";

export type { PublicLanguage };

export type PublicBlogCategory =
  | "spanish_learning_tips"
  | "ecuador_travel"
  | "school_news"
  | "student_stories"
  | "culture_and_language";

export type PublicContactSubject =
  | "online_classes"
  | "immersion"
  | "homestay"
  | "travel_spanish"
  | "other";

export type PublicOption<T extends string> = {
  value: T;
  label: string;
};

/** GET /public/packages/ and /public/packages/:id/ — bare object/array. */
export type PublicPackage = {
  id: string;
  image_url: string;
  total_classes: number;
  validity_days: number;
  /** Decimal string, e.g. "135.00" — never call `toFixed` directly. */
  price: string;
  is_first_lesson: boolean;
  sort_order: number;
  title: string;
  description: string;
  lang: PublicLanguage;
};

export type PublicTeacherAvailability = {
  day: WeekDay;
  start: string;
  end: string;
};

/** GET /public/teachers/ and /public/teachers/:id/ — bare object/array. */
export type PublicTeacher = {
  id: string;
  name: string;
  profile_img_url: string;
  tags: string[];
  institute: string;
  availability: PublicTeacherAvailability[];
  accepting_students: boolean;
  availability_label: string;
  description: string;
  lang: PublicLanguage;
};

export type PublicTeacherSlot = {
  /** Checkout-e eta unchanged `start_datetime` hisebe pathate hobe. */
  start_utc: string;
  /** Visitor-er requested timezone-e rendered time. */
  start_local: string;
  label: string;
};

export type PublicTeacherSlotDay = {
  date: string;
  slots: PublicTeacherSlot[];
};

export type PublicTeacherSlotsResponse = ApiResponse & {
  teacher: string;
  timezone: string;
  duration_minutes: number;
  days: PublicTeacherSlotDay[];
};

export type PublicCheckoutPayload = {
  teacher: string;
  package: string;
  start_datetime: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone_number?: string;
  country?: string;
  spanish_level?: SpanishLevel;
  timezone?: string;
  payment_method?: string;
};

export type PublicCheckoutResponse = ApiResponse & {
  message: string;
  booking: {
    student_package_id: string;
    session_id: string;
    package_title: string;
    teacher: string;
    start_datetime: string;
    start_local: string;
    timezone: string;
    duration_minutes: number;
    meet_link: string;
    amount_paid: string;
    currency: string;
    invoice_number: string;
    classes_remaining: number;
    account_created: boolean;
  };
};

export type PublicLeadPayload = {
  first_name: string;
  email: string;
  gdpr_consent: true;
  source?: "homepage" | "blog_post";
};

export type PublicContactPayload = {
  name: string;
  email: string;
  subject?: PublicContactSubject;
  message: string;
  programme?: string;
};

export type PublicAcknowledgementResponse = ApiResponse & {
  message: string;
  id: string;
};

/** GET /public/leads/unsubscribe/:token/ — idempotent acknowledgement. */
export type PublicUnsubscribeResponse = ApiResponse & {
  message: string;
};

/** Verified against GET /public/contact/subjects/. */
export type PublicContactSubjectsResponse = ApiResponse & {
  subjects: PublicOption<PublicContactSubject>[];
};

/** Verified against GET /public/blogs/categories/. */
export type PublicBlogCategoriesResponse = ApiResponse & {
  categories: PublicOption<PublicBlogCategory>[];
};

export type PublicBlogListItem = {
  id: string;
  slug: string;
  thumbnail: string;
  category: PublicBlogCategory;
  category_label: string;
  published_at: string;
  reading_time: number;
  title: string;
  excerpt: string;
  lang: PublicLanguage;
};

/** Detail-er `body` and `related_posts` Bruno spec-e documented. */
export type PublicBlogDetail = PublicBlogListItem & {
  body: string;
  related_posts: PublicBlogListItem[];
  meta_title?: string;
  meta_description?: string;
};

export type PublicBlogsResponse = PaginatedResponse<PublicBlogListItem>;

/** GET /public/testimonials/ — bare array. */
export type PublicTestimonial = {
  id: string;
  student_name: string;
  country: string;
  photo_url: string;
  rating: number;
  programme: string;
  outcome: string;
  lang: PublicLanguage;
};
