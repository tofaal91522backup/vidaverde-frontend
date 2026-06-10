import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const BOOKINGS_QUERY_KEY = "admin-bookings";

export type Booking = {
  id: string;
  student: { id: string; name: string; email: string };
  teacher: { id: string; name: string };
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  package: string;
  notes?: string;
  createdAt: string;
};

type BookingsResponse = { results: Booking[]; count: number };
type BookingParams = {
  page?: number;
  search?: string;
  teacher?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_BOOKINGS: Booking[] = [
  { id: "b1", student: { id: "s1", name: "James Wilson", email: "james.w@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-15", time: "10:00", status: "confirmed", package: "Starter Pack — 5 Classes", createdAt: "2026-06-10T08:30:00Z" },
  { id: "b2", student: { id: "s2", name: "Sophie Müller", email: "sophie.m@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-16", time: "09:00", status: "pending", package: "Assessment + First Lesson", createdAt: "2026-06-11T11:00:00Z" },
  { id: "b3", student: { id: "s3", name: "Liam Chen", email: "liam.c@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-18", time: "14:00", status: "confirmed", package: "Regular Pack — 10 Classes", createdAt: "2026-06-09T14:20:00Z" },
  { id: "b4", student: { id: "s4", name: "Emma Davis", email: "emma.d@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-12", time: "11:00", status: "completed", package: "Starter Pack — 5 Classes", createdAt: "2026-06-05T09:00:00Z" },
  { id: "b5", student: { id: "s5", name: "Nicolás López", email: "nicolas.l@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-20", time: "15:00", status: "pending", package: "Intensive — 20 Classes", createdAt: "2026-06-12T16:00:00Z" },
  { id: "b6", student: { id: "s6", name: "Yuki Tanaka", email: "yuki.t@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-08", time: "10:00", status: "cancelled", package: "Assessment + First Lesson", createdAt: "2026-06-04T10:30:00Z" },
  { id: "b7", student: { id: "s7", name: "Anna Kowalski", email: "anna.k@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-22", time: "09:00", status: "confirmed", package: "Regular Pack — 10 Classes", createdAt: "2026-06-13T07:45:00Z" },
  { id: "b8", student: { id: "s8", name: "Tom Harrison", email: "tom.h@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-25", time: "14:00", status: "pending", package: "Starter Pack — 5 Classes", createdAt: "2026-06-14T12:00:00Z" },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useBookings(params: BookingParams) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<BookingsResponse>({
  //   url: makeEndpoint("/api/bookings/", params),
  //   querykey: [BOOKINGS_QUERY_KEY, params],
  // });

  let filtered = MOCK_BOOKINGS;
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.student.name.toLowerCase().includes(q) ||
        b.teacher.name.toLowerCase().includes(q),
    );
  }
  if (params.status) filtered = filtered.filter((b) => b.status === params.status);
  if (params.teacher) filtered = filtered.filter((b) => b.teacher.id === params.teacher);
  if (params.dateFrom) filtered = filtered.filter((b) => b.date >= params.dateFrom!);
  if (params.dateTo) filtered = filtered.filter((b) => b.date <= params.dateTo!);

  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<BookingsResponse>({
    url: makeEndpoint("/api/bookings/", params),
    querykey: [BOOKINGS_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}
