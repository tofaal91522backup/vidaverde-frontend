/**
 * Student portal er shob type. Backend spec: docs/bruno/student/*.bru (commit f7ccf8b).
 *
 * Shob datetime ISO-8601 UTC offset shoho ashe. Jekhane student-er jonno render hoy
 * shekhane `start_local` field-eo thake — sheta-i dekhano uchit, nijer theke convert
 * kora jabe na. Response-er `timezone` field bole kon zone-e local ta.
 */
import type {
  ApiResponse,
  ListResponse,
  PaginatedResponse,
} from "@/types/api-response.type";

// ─── Shared enums ────────────────────────────────────────────────────────────

// Admin-eo ei enum gula lage, tai `@/types/domain.type` e shorano hoyeche.
// Ekhan theke re-export kora hoy jate ager import gula ojotha na bhange.
import type { SessionStatus, SpanishLevel } from "@/types/domain.type";

export type { SessionStatus, SpanishLevel };

// ─── Entities ────────────────────────────────────────────────────────────────

/** docs/bruno/student/invoices.bru */
export type StudentInvoice = {
  id: string;
  number: string;
  issued_at: string;
  /** Decimal string, e.g. "12.00" — number na */
  amount: string;
  currency: string;
  package_title: string;
};

/**
 * Kena hoyar shomoy package-er frozen copy. Catalogue pore edit hole-o
 * karo history rewrite hoy na.
 */
export type PackageSnapshot = {
  id: string;
  /** Decimal string */
  price: string;
  title_en: string;
  total_classes: number;
  validity_days: number;
  is_first_lesson: boolean;
};

/** docs/bruno/student/packages.bru */
export type StudentPackage = {
  id: string;
  /** Catalogue package er uuid */
  package: string;
  package_title: string;
  package_data: PackageSnapshot;
  /** Decimal string */
  amount_paid: string;
  payment_status: string;
  payment_provider: string;
  payment_reference: string;
  paid_at: string;
  student_email: string;
  student_name: string;
  current_spanish_level: SpanishLevel;
  classes_total: number;
  classes_used: number;
  /** Computed */
  classes_remaining: number;
  expires_at: string;
  /** Computed */
  is_expired: boolean;
  /** Computed — paid + expire hoy nai + at least 1 class baki. "Book a class" button ei ta diye gate korte hobe */
  can_book: boolean;
  /** Computed, 0-100 */
  progress_percent: number;
  invoice: StudentInvoice;
  created_at: string;
};

/** docs/bruno/student/sessions.bru */
export type StudentSession = {
  id: string;
  student_package: string;
  package_title: string;
  /** Teacher er uuid */
  teacher: string;
  teacher_name: string;
  teacher_img: string;
  student_name: string;
  student_email: string;
  start_datetime: string;
  /** Student-er nijer timezone-e shei ek-i shomoy */
  start_local: string;
  end_datetime: string;
  duration_minutes: number;
  status: SessionStatus;
  meet_link: string;
  /** Admin er internal note — student ke dekhano hoy na */
  admin_notes: string;
  /** 24 ghontar cutoff-er bhitore dhuke gele false */
  can_reschedule: boolean;
  rescheduled_from: string | null;
  created_at: string;
};

/** docs/bruno/student/me.bru — `id`, `email`, `active` read-only */
export type StudentProfile = {
  id: string;
  email: string;
  name: string;
  profile_img_url: string;
  country: string;
  phone_number: string;
  /** IANA name, e.g. "Europe/Berlin" */
  timezone: string;
  current_spanish_level: SpanishLevel;
  active: boolean;
  created_at: string;
  updated_at: string;
};

// ─── Response shapes ─────────────────────────────────────────────────────────

/** Dashboard-er `next_session` — StudentSession er chhoto version */
export type DashboardNextSession = Pick<
  StudentSession,
  | "id"
  | "package_title"
  | "teacher_name"
  | "start_datetime"
  | "start_local"
  | "end_datetime"
  | "duration_minutes"
  | "status"
  | "meet_link"
  | "can_reschedule"
>;

/** GET /student/dashboard/ */
export type StudentDashboardResponse = ApiResponse & {
  timezone: string;
  /** Kichu schedule na thakle null */
  next_session: DashboardNextSession | null;
  packages: StudentPackage[];
  recent_invoices: StudentInvoice[];
};

/** GET /student/packages/ */
export type StudentPackagesResponse = ListResponse<StudentPackage>;

/** GET /student/invoices/ */
export type StudentInvoicesResponse = ListResponse<StudentInvoice>;

/** GET /student/sessions/ — paginated, shathe timezone label */
export type StudentSessionsResponse = PaginatedResponse<StudentSession> & {
  timezone: string;
};

/** GET | PATCH /student/me/ */
export type StudentProfileResponse = ApiResponse & {
  profile: StudentProfile;
};

/** POST /student/sessions/ — book */
export type BookSessionResponse = ApiResponse & {
  session: Pick<
    StudentSession,
    | "id"
    | "package_title"
    | "teacher_name"
    | "start_datetime"
    | "end_datetime"
    | "duration_minutes"
    | "status"
    | "meet_link"
    | "can_reschedule"
    | "rescheduled_from"
  >;
};

/** POST /student/sessions/:id/reschedule/ */
export type RescheduleSessionResponse = ApiResponse & {
  message: string;
  session: Pick<
    StudentSession,
    | "id"
    | "teacher_name"
    | "start_datetime"
    | "end_datetime"
    | "status"
    | "meet_link"
    | "can_reschedule"
    | "rescheduled_from"
  >;
};

/** POST /student/sessions/:id/cancel/ — no body */
export type CancelSessionResponse = ApiResponse & {
  /** 24 ghontar age cancel korle class package-e ferot jay */
  class_returned: boolean;
  message: string;
};

// ─── Request payloads ────────────────────────────────────────────────────────

/** POST /student/sessions/ */
export type BookSessionPayload = {
  student_package: string;
  teacher: string;
  /** ISO-8601 with offset — slots API er `start_utc` hubohu pathate hobe */
  start_datetime: string;
};

/** POST /student/sessions/:id/reschedule/ */
export type RescheduleSessionPayload = {
  start_datetime: string;
  /** Teacher-o bodlate chaile. Bad dile ekhonkar teacher thakbe */
  teacher?: string;
};

/** PATCH /student/me/ — shob field optional, ja bodleche shudhu ta pathano */
export type UpdateStudentProfilePayload = Partial<
  Pick<
    StudentProfile,
    | "name"
    | "profile_img_url"
    | "country"
    | "phone_number"
    | "timezone"
    | "current_spanish_level"
  >
>;

// ─── Public endpoints (student flow-e lagbe) ─────────────────────────────────

/** Teacher-er weekly rule — SCHOOL time-e (America/Guayaquil), asol slot na */
export type TeacherAvailabilityRule = {
  /** "mon", "tue", ... */
  day: string;
  /** "08:00" */
  start: string;
  end: string;
};

/**
 * docs/bruno/public/teachers.bru
 *
 * ⚠️ Ei endpoint **bare array** dey — `{ success, results }` envelope **nai**.
 * Baki student endpoint gular moto na.
 */
export type PublicTeacher = {
  id: string;
  name: string;
  profile_img_url: string;
  tags: string[];
  institute: string;
  availability: TeacherAvailabilityRule[];
  accepting_students: boolean;
  /** "Accepting new students" ba "Limited availability" */
  availability_label: string;
  description: string;
  lang: string;
};

/** docs/bruno/public/teacher slots.bru — ekta bookable slot */
export type TeacherSlot = {
  /** Checkout/book-e ei ta hubohu `start_datetime` hisebe pathate hobe */
  start_utc: string;
  start_local: string;
  /** Render-ready, e.g. "14:00" */
  label: string;
};

export type TeacherSlotDay = {
  /** YYYY-MM-DD */
  date: string;
  slots: TeacherSlot[];
};

/** GET /public/teachers/:id/slots/?date=&tz=&days= */
export type TeacherSlotsResponse = ApiResponse & {
  teacher: string;
  timezone: string;
  duration_minutes: number;
  days: TeacherSlotDay[];
};
