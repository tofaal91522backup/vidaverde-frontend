import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const SESSIONS_QUERY_KEY = "admin-sessions";

export type SessionStatus = "upcoming" | "completed" | "no-show" | "rescheduled";

export type Session = {
  id: string;
  student: { id: string; name: string; email: string };
  teacher: { id: string; name: string };
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  adminNotes?: string;
  package?: string;
};

type SessionsResponse = { results: Session[]; count: number };
type SessionParams = {
  page?: number;
  search?: string;
  status?: string;
  teacher?: string;
  dateFrom?: string;
  dateTo?: string;
};

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_SESSIONS: Session[] = [
  { id: "ss1", student: { id: "s1", name: "James Wilson", email: "james.w@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-15", time: "10:00", duration: 60, status: "upcoming", package: "Starter Pack" },
  { id: "ss2", student: { id: "s2", name: "Sophie Müller", email: "sophie.m@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-16", time: "09:00", duration: 60, status: "upcoming", package: "Assessment" },
  { id: "ss3", student: { id: "s3", name: "Liam Chen", email: "liam.c@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-18", time: "14:00", duration: 60, status: "upcoming", package: "Regular Pack" },
  { id: "ss4", student: { id: "s5", name: "Nicolás López", email: "nicolas.l@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-20", time: "15:00", duration: 60, status: "upcoming", package: "Intensive" },
  { id: "ss5", student: { id: "s7", name: "Anna Kowalski", email: "anna.k@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-06-22", time: "09:00", duration: 60, status: "upcoming", package: "Regular Pack" },
  { id: "ss6", student: { id: "s4", name: "Emma Davis", email: "emma.d@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-05", time: "11:00", duration: 60, status: "completed", package: "Starter Pack", adminNotes: "Great progress with ser/estar." },
  { id: "ss7", student: { id: "s6", name: "Yuki Tanaka", email: "yuki.t@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-03", time: "10:00", duration: 60, status: "no-show", adminNotes: "Student did not join. Sent follow-up email." },
  { id: "ss8", student: { id: "s8", name: "Tom Harrison", email: "tom.h@example.com" }, teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-01", time: "14:00", duration: 60, status: "rescheduled" },
  { id: "ss9", student: { id: "s1", name: "James Wilson", email: "james.w@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-05-28", time: "10:00", duration: 60, status: "completed", package: "Starter Pack" },
  { id: "ss10", student: { id: "s3", name: "Liam Chen", email: "liam.c@example.com" }, teacher: { id: "t1", name: "María González" }, date: "2026-05-25", time: "14:00", duration: 60, status: "completed", package: "Regular Pack", adminNotes: "Focused on business vocabulary. Ready for next level." },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useSessions(params: SessionParams) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<SessionsResponse>({
  //   url: makeEndpoint("/api/sessions/", params),
  //   querykey: [SESSIONS_QUERY_KEY, params],
  // });

  let filtered = MOCK_SESSIONS;

  if (params.status) {
    const statuses = params.status.split(",") as SessionStatus[];
    filtered = filtered.filter((s) => statuses.includes(s.status));
  }
  if (params.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.student.name.toLowerCase().includes(q) ||
        s.teacher.name.toLowerCase().includes(q),
    );
  }
  if (params.teacher) filtered = filtered.filter((s) => s.teacher.id === params.teacher);

  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<SessionsResponse>({
    url: makeEndpoint("/api/sessions/", params),
    querykey: [SESSIONS_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}

export function useUpdateSession() {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: ({ id, ...data }) => request.patch(`/api/sessions/${id}/`, data),
  // invalidateKeys: [[SESSIONS_QUERY_KEY]],
  return useMutationHandler<any, { id: string; status?: SessionStatus; adminNotes?: string }>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Session updated!",
    debugLabel: "UpdateSession",
  });
}
