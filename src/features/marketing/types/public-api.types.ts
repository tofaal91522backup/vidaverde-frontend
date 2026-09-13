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
  /**
   * Koyjon teacher-er shathe ei package book kora jay.
   *
   * Restricted na hole eta shob active teacher-er shongkha — `0` mane "kono
   * teacher nai", `restricted: false` mane "shobai". 2026-09-05 e joda hoyeche.
   */
  teacher_count: number;
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
/**
 * ⚠️ **Detail-e `thumbnail` nai — `image_urls` ache.**
 *
 * List (`blogs.bru`) proti item-e ekta `thumbnail` string dey; detail
 * (`blog detail.bru`) puro `image_urls` array dey ar prothom ta-i thumbnail
 * (admin form-eও ei niyom lekha). Tai `PublicBlogListItem` theke `thumbnail`
 * `Omit` kora — na hole type bolto field ta ache, othocho render-e `undefined`
 * ashto ar chhobi chup-chap uthe jeto.
 *
 * `related_posts` list item, tai oigula-te `thumbnail`-i thake.
 */
export type PublicBlogDetail = Omit<PublicBlogListItem, "thumbnail"> & {
  /** Prothom ta hero/thumbnail. Khali hote pare. */
  image_urls: string[];
  body: string;
  related_posts: PublicBlogListItem[];
  meta_title?: string;
  meta_description?: string;
};

/**
 * `GET /public/blogs/:slug/` — ⚠️ **envelope-er bhitore**, list-er moto bare na.
 *
 * `{ success, post: {...} }`. List endpoint paginated object dey ar
 * packages/teachers bare array — ei ek-i folder-e tin rokom shape, tai eta
 * alada kore likha.
 */
export type PublicBlogDetailResponse = ApiResponse & {
  post: PublicBlogDetail;
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

/* -------------------------------------------------------------------------- */
/* Booking step 2 — package <-> teacher                                        */
/* docs/bruno/public/package teachers.bru, teacher packages.bru                 */
/* -------------------------------------------------------------------------- */

/**
 * `next_available` — window-er prothom khali slot.
 *
 * `PublicTeacherSlot` er moto, kintu ekhane `date`-o thake ("Next available:
 * Mon 14:00" badge banate lage).
 */
export type PublicSlotRef = PublicTeacherSlot & {
  date: string;
};

/**
 * `GET /public/packages/:id/teachers/` er teacher.
 *
 * Shadharon `PublicTeacher`-er shathe **oi teacher-er puro slot list** ashe —
 * tai step 2 (teacher bachai) ar date picker ek-i screen-e, proti teacher-er
 * jonno alada slot call lage na.
 */
export type PublicPackageTeacher = PublicTeacher & {
  next_available: PublicSlotRef | null;
  /** Puro window-e mot koto slot. */
  slot_count: number;
  /** Proti requested din-er ek ta entry — **khali din-o thake**, tai grid-e gap pore na. */
  days: PublicTeacherSlotDay[];
};

/**
 * `GET /public/packages/:id/teachers/` — **booking step 2**.
 *
 * Backend-er documented flow: package -> teacher -> pay.
 *
 * ⚠️ **Jei teacher-er oi window-e ekta-o slot nai, take backend list theke bad
 * diye dey.** Tai khali list mane "teacher nai" na — "ei koy din-e keu free nai".
 * UI-te ei duita alada kore bolte hobe, na hole visitor bhabbe package ta nosto.
 *
 * Restricted package-er shob teacher deactivated hole backend shob active
 * teacher-e fallback kore — khali picker dekhay na.
 */
export type PackageTeachersResponse = ApiResponse & {
  package: {
    id: string;
    title: string;
    /** Decimal string. */
    price: string;
    total_classes: number;
    is_first_lesson: boolean;
    /** `true` mane package ta nirdishto teacher-e shimito. */
    restricted: boolean;
  };
  timezone: string;
  duration_minutes: number;
  from_date: string;
  days_requested: number;
  teachers: PublicPackageTeacher[];
};

/** `GET /public/teachers/:id/packages/` er package card. */
export type PublicTeacherPackage = PublicPackage & {
  /**
   * `true` shudhu tokhon jokhon package ta **explicitly** ei teacher-ke name kore
   * shimito kora. Unrestricted package-e `false` — tokhon-o ei teacher-er shathe
   * kena jay. "Exclusive" badge ei flag dhore dite hobe, `teacher_count` dhore na.
   */
  restricted_to_listed_teachers: boolean;
};

/**
 * `GET /public/teachers/:id/packages/` — **teacher-first** entry.
 *
 * Mul flow package-first, kintu teacher card/profile-e "Book with X" chaple
 * ekhan theke shuru hoy.
 *
 * Availability package-bhede bodlay na, tai `next_available` proti card-e na
 * diye ekbar `teacher` block-e thake. `null` hole-o package gula **kena jay** —
 * tai card disable kora jabe na.
 *
 * Inactive teacher -> 404.
 */
export type TeacherPackagesResponse = ApiResponse & {
  teacher: Pick<
    PublicTeacher,
    | "id"
    | "name"
    | "profile_img_url"
    | "tags"
    | "institute"
    | "description"
    | "accepting_students"
    | "availability_label"
  > & {
    next_available: PublicSlotRef | null;
  };
  timezone: string;
  days_searched: number;
  packages: PublicTeacherPackage[];
};
