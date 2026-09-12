/**
 * Admin dashboard-er shob type. Backend spec: docs/bruno/administrator/*.bru
 * (commit f7ccf8b).
 *
 * ⚠️ **Envelope ek rokom NA.** Student-e prai shob `{ success, results }` chhilo,
 * kintu admin-e proti endpoint alada — kono ta `{ success, teacher }`, kono ta
 * bare object, list gula te `success` key-i nai. Proti response type-er upore
 * kon shape ta likhe rakha ache — dhore neওয়া jabe na.
 *
 * ⚠️ **Shob datetime school time e** (America/Guayaquil). Student-er moto
 * `start_local` **nai** — `utils/format-school-datetime.ts` dekho.
 */
import type {
  ApiResponse,
  ListResponse,
  PaginatedResponse,
} from "@/types/api-response.type";
import type {
  SessionStatus,
  SpanishLevel,
  WeekDay,
} from "@/types/domain.type";

export type { SessionStatus, SpanishLevel, WeekDay };

// ─── Enums ───────────────────────────────────────────────────────────────────

/** docs/bruno/administrator/admins.bru — `master` extra vabe admins/ unlock kore */
export type AdminRole = "master" | "manager";

/** docs/bruno/administrator/bookings.bru */
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

/** docs/bruno/administrator/blogs.bru */
export type BlogCategory =
  | "spanish_learning_tips"
  | "ecuador_travel"
  | "school_news"
  | "student_stories"
  | "culture_and_language";

export type BlogStatus = "draft" | "published";

/** docs/bruno/administrator/emails.bru */
export type EmailStatus = "pending" | "sent" | "failed" | "cancelled";

export type EmailTemplateKey =
  | "lead_guide"
  | "nurture_2"
  | "nurture_3"
  | "nurture_4"
  | "booking_confirmation"
  | "booking_credentials"
  | "teacher_new_booking"
  | "session_reminder"
  | "session_followup"
  | "contact_received"
  | "contact_notification";

// ─── Teacher ─────────────────────────────────────────────────────────────────

/**
 * Weekly recurring availability, **school time** e.
 * `start` < `end` hote hobe, na hole backend 400 dey.
 */
export type TeacherAvailabilityRule = {
  day: WeekDay;
  /** "HH:MM", 24-hour */
  start: string;
  end: string;
};

/** docs/bruno/administrator/teacher time off.bru */
export type TeacherTimeOff = {
  id: string;
  teacher: string;
  start_datetime: string;
  end_datetime: string;
  reason: string;
  created_at: string;
};

/** docs/bruno/administrator/teachers.bru */
export type AdminTeacher = {
  id: string;
  name: string;
  profile_img_url: string;
  /** Free-text specialisation, card-e chip hisebe dekhay */
  tags: string[];
  institute: string;
  description_en: string;
  description_es: string;
  availability: TeacherAvailabilityRule[];
  /** true → "Accepting new students", false → "Limited availability" */
  accepting_students: boolean;
  /** Khali hole Calendar sync off, `meet_link` use hobe */
  google_calendar_id: string;
  meet_link: string;
  active: boolean;
  /** Shudhu detail response-e ashe */
  time_off?: TeacherTimeOff[];
  /** `?lang=` onujayi computed */
  description: string;
  lang: string;
  created_at: string;
  updated_at: string;
};

// ─── Package ─────────────────────────────────────────────────────────────────

/** docs/bruno/administrator/packages.bru */
export type AdminPackage = {
  id: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  image_url: string;
  total_classes: number;
  validity_days: number;
  /** Decimal **string** — "250.00". Number na */
  price: string;
  /** Shudhu ekta package-e true thaka uchit */
  is_first_lesson: boolean;
  sort_order: number;
  active: boolean;
  /** computed */
  title: string;
  description: string;
  lang: string;
  created_at: string;
  updated_at: string;
};

// ─── Blog ────────────────────────────────────────────────────────────────────

/** docs/bruno/administrator/blogs.bru */
export type AdminBlog = {
  id: string;
  title_en: string;
  title_es: string;
  /** Na dile `title_en` theke auto, unique kora hoy. Read-only bhabe treat koro */
  slug: string;
  excerpt_en: string;
  excerpt_es: string;
  /** Rich HTML */
  body_en: string;
  body_es: string;
  image_urls: string[];
  /** computed — `image_urls[0]` */
  thumbnail: string;
  category: BlogCategory;
  /** computed, read-only — admin-er email */
  author: string;
  status: BlogStatus;
  /** `published` howar shomoy ekbar stamp hoy, pore ar bodlay na */
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  /** computed, read-only — word count / 200, minimum 1 */
  reading_time: number;
  /** computed */
  title: string;
  excerpt: string;
  body: string;
  lang: string;
  created_at: string;
  updated_at: string;
};

// ─── Session ─────────────────────────────────────────────────────────────────

/**
 * docs/bruno/administrator/sessions.bru
 *
 * ⚠️ Student-er `StudentSession` er theke alada — ekhane `start_local`,
 * `teacher_img` **nai**, ar `student_email` ache.
 */
export type AdminSession = {
  id: string;
  student_package: string;
  package_title: string;
  teacher: string;
  teacher_name: string;
  student_name: string;
  student_email: string;
  /** School time */
  start_datetime: string;
  end_datetime: string;
  duration_minutes: number;
  status: SessionStatus;
  meet_link: string;
  /** Student ke dekhano hoy na */
  admin_notes: string;
  can_reschedule: boolean;
  rescheduled_from: string | null;
  created_at: string;
};

/**
 * docs/bruno/administrator/calendar.bru — calendar component je shape
 * shoja khete pare.
 */
export type AdminCalendarEvent = {
  id: string;
  /** "Teacher Name / Student Name" */
  title: string;
  start: string;
  end: string;
  status: SessionStatus;
  teacher_id: string;
  teacher_name: string;
  student_name: string;
  meet_link: string;
  /** Backend-i teacher onujayi fixed palette theke dey — frontend-e banate hobe na */
  color: string;
};

// ─── Booking (= ekta purchase) ───────────────────────────────────────────────

/**
 * docs/bruno/administrator/bookings.bru
 *
 * ⚠️ **"Booking" mane ekta purchase, ekta class booking NA.** Ekhane teacher,
 * date ba time **nai** — shudhu ke ki kinlo, koto dilo, koto class baki.
 */
export type AdminBooking = {
  id: string;
  package_title: string;
  /** Decimal string */
  amount_paid: string;
  payment_status: PaymentStatus;
  payment_provider: string;
  payment_reference: string;
  paid_at: string;
  student_email: string;
  student_name: string;
  current_spanish_level: SpanishLevel;
  classes_total: number;
  classes_used: number;
  classes_remaining: number;
  expires_at: string;
  is_expired: boolean;
  can_book: boolean;
  progress_percent: number;
  /** Student-er invoice-er theke chhoto — shudhu ei 3 ta field */
  invoice: {
    number: string;
    amount: string;
    currency: string;
  };
  created_at: string;
};

// ─── Student (admin theke dekha) ─────────────────────────────────────────────

/** docs/bruno/administrator/students.bru — read-only, admin edit kore na */
export type AdminStudent = {
  id: string;
  email: string;
  name: string;
  profile_img_url: string;
  country: string;
  phone_number: string;
  timezone: string;
  current_spanish_level: SpanishLevel;
  active: boolean;
  created_at: string;
  updated_at: string;
};

// ─── Testimonial ─────────────────────────────────────────────────────────────

/** docs/bruno/administrator/testimonials.bru */
export type AdminTestimonial = {
  id: string;
  student_name: string;
  country: string;
  photo_url: string;
  outcome_en: string;
  outcome_es: string;
  rating: number;
  programme: string;
  active: boolean;
  sort_order: number;
  /** computed */
  outcome: string;
  lang: string;
  created_at: string;
  updated_at: string;
};

// ─── Contact message ─────────────────────────────────────────────────────────

/** docs/bruno/administrator/contact messages.bru — shudhu `handled` + `admin_notes` lekha jay */
export type AdminContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  subject_label: string;
  message: string;
  programme: string;
  handled: boolean;
  /** `handled: true` korle backend nijei stamp kore */
  handled_at: string | null;
  admin_notes: string;
  created_at: string;
};

// ─── Lead ────────────────────────────────────────────────────────────────────

/** docs/bruno/administrator/leads.bru — read-only */
export type AdminLead = {
  id: string;
  first_name: string;
  email: string;
  gdpr_consent: boolean;
  source: string;
  guide_sent_at: string | null;
  /** Queued sequence koto dur gelo. 4 = tinta follow-up-i schedule hoyeche */
  nurture_stage: number;
  is_subscribed: boolean;
  unsubscribed_at: string | null;
  /** Checkout complete korle backend stamp kore */
  converted_at: string | null;
  created_at: string;
};

// ─── Scheduled email ─────────────────────────────────────────────────────────

/** docs/bruno/administrator/emails.bru — read-only outbox */
export type AdminScheduledEmail = {
  id: string;
  to_email: string;
  template_key: EmailTemplateKey;
  subject: string;
  send_at: string;
  sent_at: string | null;
  status: EmailStatus;
  /** 3 bar try korar por `failed` */
  attempts: number;
  error: string;
  created_at: string;
};

// ─── Admin account ───────────────────────────────────────────────────────────

/**
 * docs/bruno/administrator/admins.bru — **master only**
 *
 * ⚠️ `password_txt` clear-text password. Backend ichchhe kore eibhabe rakhe,
 * kintu **ei field UI te kothao dekhano/log kora jabe na** shudhu master-er
 * nijer "reveal" action chhara.
 */
export type AdminAccount = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  password_txt: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

// ─── Dashboard summary ───────────────────────────────────────────────────────

/** docs/bruno/administrator/dashboard summary.bru */
export type AdminDashboardCards = {
  students: number;
  teachers: number;
  sessions_upcoming: number;
  sessions_today: number;
  bookings_30d: number;
  /** Decimal string */
  revenue_30d: string;
  leads_total: number;
  leads_30d: number;
  contact_unhandled: number;
  blogs_draft: number;
  emails_pending: number;
  /** > 0 hole UI te dekhano uchit — cron 3 bar try korar por-o pathate pare ni */
  emails_failed: number;
};

export type SessionStatusCount = {
  status: SessionStatus;
  count: number;
};

// ─── Response shapes (proti ta alada — niche shape lekha ache) ───────────────

/** `{ success, cards, sessions_by_status, upcoming_sessions }` */
export type AdminDashboardResponse = ApiResponse & {
  cards: AdminDashboardCards;
  sessions_by_status: SessionStatusCount[];
  upcoming_sessions: AdminSession[];
};

/** `{ success, teacher }` */
export type AdminTeacherResponse = ApiResponse & {
  teacher: AdminTeacher;
};

/** `{ success, time_off }` */
export type TeacherTimeOffResponse = ApiResponse & {
  time_off: TeacherTimeOff;
};

/** `{ success, session }` — PATCH /administrator/sessions/:id/ */
export type AdminSessionResponse = ApiResponse & {
  session: AdminSession;
};

/**
 * GET /administrator/students/:id/
 *
 * ✅ Shape **backend source theke confirm kora**
 * (`administrator/views/accounts.py` → `StudentDetailView.retrieve`):
 * `{ success, student, packages, sessions }`.
 */
export type AdminStudentDetailResponse = ApiResponse & {
  student: AdminStudent;
  packages: AdminBooking[];
  sessions: AdminSession[];
};

/** `{ success, message_detail }` */
export type AdminContactMessageResponse = ApiResponse & {
  message_detail: AdminContactMessage;
};

/** `{ success, admin }` */
export type AdminAccountResponse = ApiResponse & {
  admin: AdminAccount;
};

/** `{ success, timezone, events }` — paginated NA */
export type AdminCalendarResponse = ApiResponse & {
  timezone: string;
  events: AdminCalendarEvent[];
};

/**
 * Paginated list — ei gula te `success` key **nai**, tai `PaginatedResponse`
 * er `success` optional bhabe treat korte hobe (thakle-o oshubidha nai).
 */
export type AdminSessionsResponse = PaginatedResponse<AdminSession>;
export type AdminBookingsResponse = PaginatedResponse<AdminBooking>;
export type AdminStudentsResponse = PaginatedResponse<AdminStudent>;
export type AdminLeadsResponse = PaginatedResponse<AdminLead>;
export type AdminEmailsResponse = PaginatedResponse<AdminScheduledEmail>;
export type AdminContactMessagesResponse =
  PaginatedResponse<AdminContactMessage>;
export type AdminBlogsResponse = PaginatedResponse<AdminBlog>;

/**
 * ⚠️ **Ei 3 tar list shape bru te dekhano nai** — POST bare object dey, ar doc
 * bole "not paginated". Step 2/4/10-e asol API mile dekhe confirm korte hobe;
 * bare array hole `AdminPackage[]` kore dite hobe.
 */
export type AdminPackagesResponse = ListResponse<AdminPackage> | AdminPackage[];
export type AdminTeachersResponse = ListResponse<AdminTeacher> | AdminTeacher[];
export type AdminTestimonialsResponse =
  | ListResponse<AdminTestimonial>
  | AdminTestimonial[];
export type AdminAccountsResponse =
  | ListResponse<AdminAccount>
  | AdminAccount[];
