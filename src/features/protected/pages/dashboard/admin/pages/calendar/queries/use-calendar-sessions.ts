import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const CALENDAR_SESSIONS_QUERY_KEY = "admin-calendar-sessions";

export type CalendarSession = {
  id: string;
  student: { id: string; name: string };
  teacher: { id: string; name: string };
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "no-show" | "rescheduled";
  package?: string;
};

type CalendarParams = { startDate: string; endDate: string; teacher?: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_CALENDAR_SESSIONS: CalendarSession[] = [
  { id: "c1",  student: { id: "s1", name: "James Wilson" },   teacher: { id: "t1", name: "María González" },   date: "2026-06-10", time: "10:00", duration: 60, status: "upcoming",   package: "Starter Pack" },
  { id: "c2",  student: { id: "s2", name: "Sophie Müller" },  teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-11", time: "09:00", duration: 60, status: "upcoming",   package: "Assessment" },
  { id: "c3",  student: { id: "s3", name: "Liam Chen" },      teacher: { id: "t1", name: "María González" },   date: "2026-06-12", time: "14:00", duration: 60, status: "completed",  package: "Regular Pack" },
  { id: "c4",  student: { id: "s4", name: "Emma Davis" },     teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-12", time: "11:00", duration: 60, status: "completed",  package: "Starter Pack" },
  { id: "c5",  student: { id: "s5", name: "Nicolás López" },  teacher: { id: "t1", name: "María González" },   date: "2026-06-15", time: "15:00", duration: 60, status: "upcoming",   package: "Intensive" },
  { id: "c6",  student: { id: "s6", name: "Yuki Tanaka" },    teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-15", time: "10:00", duration: 60, status: "upcoming" },
  { id: "c7",  student: { id: "s7", name: "Anna Kowalski" },  teacher: { id: "t1", name: "María González" },   date: "2026-06-16", time: "09:00", duration: 60, status: "upcoming",   package: "Regular Pack" },
  { id: "c8",  student: { id: "s8", name: "Tom Harrison" },   teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-17", time: "14:00", duration: 60, status: "rescheduled" },
  { id: "c9",  student: { id: "s1", name: "James Wilson" },   teacher: { id: "t1", name: "María González" },   date: "2026-06-18", time: "10:00", duration: 60, status: "upcoming",   package: "Starter Pack" },
  { id: "c10", student: { id: "s3", name: "Liam Chen" },      teacher: { id: "t1", name: "María González" },   date: "2026-06-19", time: "14:00", duration: 60, status: "upcoming",   package: "Regular Pack" },
  { id: "c11", student: { id: "s2", name: "Sophie Müller" },  teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-19", time: "09:00", duration: 60, status: "upcoming" },
  { id: "c12", student: { id: "s5", name: "Nicolás López" },  teacher: { id: "t1", name: "María González" },   date: "2026-06-20", time: "15:00", duration: 60, status: "upcoming",   package: "Intensive" },
  { id: "c13", student: { id: "s4", name: "Emma Davis" },     teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-22", time: "11:00", duration: 60, status: "upcoming",   package: "Starter Pack" },
  { id: "c14", student: { id: "s7", name: "Anna Kowalski" },  teacher: { id: "t1", name: "María González" },   date: "2026-06-23", time: "09:00", duration: 60, status: "upcoming",   package: "Regular Pack" },
  { id: "c15", student: { id: "s8", name: "Tom Harrison" },   teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-25", time: "14:00", duration: 60, status: "upcoming",   package: "Starter Pack" },
  { id: "c16", student: { id: "s6", name: "Yuki Tanaka" },    teacher: { id: "t2", name: "Carlos Rodríguez" }, date: "2026-06-25", time: "10:00", duration: 60, status: "no-show" },
  { id: "c17", student: { id: "s1", name: "James Wilson" },   teacher: { id: "t1", name: "María González" },   date: "2026-06-26", time: "10:00", duration: 60, status: "upcoming",   package: "Starter Pack" },
  { id: "c18", student: { id: "s3", name: "Liam Chen" },      teacher: { id: "t1", name: "María González" },   date: "2026-06-30", time: "14:00", duration: 60, status: "upcoming",   package: "Regular Pack" },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useCalendarSessions(params: CalendarParams) {
  // ✅ REAL API. Uncomment this and remove the demo block below:
  // return useFetchData<CalendarSession[]>({
  //   url: makeEndpoint("/api/sessions/calendar/", params),
  //   querykey: [CALENDAR_SESSIONS_QUERY_KEY, params],
  //   options: { enabled: !!params.startDate && !!params.endDate },
  // });

  let filtered = MOCK_CALENDAR_SESSIONS.filter(
    (s) => s.date >= params.startDate && s.date <= params.endDate,
  );
  if (params.teacher) {
    filtered = filtered.filter((s) => s.teacher.id === params.teacher);
  }

  return useFetchData<CalendarSession[]>({
    url: makeEndpoint("/api/sessions/calendar/", params),
    querykey: [CALENDAR_SESSIONS_QUERY_KEY, params],
    options: { enabled: false, initialData: filtered },
  });
}
