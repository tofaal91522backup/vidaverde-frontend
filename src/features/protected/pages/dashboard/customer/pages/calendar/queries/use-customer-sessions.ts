import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const CUSTOMER_SESSIONS_QUERY_KEY = "customer-sessions";

export type CustomerSession = {
  id: string;
  teacher: { id: string; name: string };
  date: string;
  timeUtc: string;
  duration: number;
  status: "upcoming" | "completed" | "no-show" | "rescheduled";
  meetingLink?: string;
  package?: string;
};

type CalendarParams = { startDate: string; endDate: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
// timeUtc is stored as HH:MM UTC. The calendar converts to browser local time.
const MOCK_CUSTOMER_SESSIONS: CustomerSession[] = [
  { id: "cs1",  teacher: { id: "t1", name: "María González" },   date: "2026-06-10", timeUtc: "15:00", duration: 60, status: "completed", meetingLink: "https://meet.google.com/abc-defg-hij", package: "Starter Pack" },
  { id: "cs2",  teacher: { id: "t1", name: "María González" },   date: "2026-06-15", timeUtc: "15:00", duration: 60, status: "upcoming",  meetingLink: "https://meet.google.com/bcd-efgh-ijk", package: "Regular Pack" },
  { id: "cs3",  teacher: { id: "t1", name: "María González" },   date: "2026-06-18", timeUtc: "15:00", duration: 60, status: "upcoming",  meetingLink: "https://meet.google.com/cde-fghi-jkl", package: "Regular Pack" },
  { id: "cs4",  teacher: { id: "t1", name: "María González" },   date: "2026-06-22", timeUtc: "14:00", duration: 60, status: "upcoming",  meetingLink: "https://meet.google.com/def-ghij-klm", package: "Regular Pack" },
  { id: "cs5",  teacher: { id: "t1", name: "María González" },   date: "2026-06-25", timeUtc: "15:00", duration: 60, status: "upcoming",  meetingLink: "https://meet.google.com/efg-hijk-lmn", package: "Intensive" },
  { id: "cs6",  teacher: { id: "t1", name: "María González" },   date: "2026-06-29", timeUtc: "15:00", duration: 60, status: "upcoming",  meetingLink: "https://meet.google.com/fgh-ijkl-mno", package: "Intensive" },
  { id: "cs7",  teacher: { id: "t1", name: "María González" },   date: "2026-05-28", timeUtc: "15:00", duration: 60, status: "completed", meetingLink: "https://meet.google.com/ghi-jklm-nop", package: "Starter Pack" },
  { id: "cs8",  teacher: { id: "t1", name: "María González" },   date: "2026-05-21", timeUtc: "15:00", duration: 60, status: "completed", package: "Starter Pack" },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useCustomerSessions(params: CalendarParams) {
  // ✅ REAL API. Uncomment this and remove the demo block below:
  // return useFetchData<CustomerSession[]>({
  //   url: makeEndpoint("/api/customer/sessions/", params),
  //   querykey: [CUSTOMER_SESSIONS_QUERY_KEY, params],
  //   options: { enabled: !!params.startDate && !!params.endDate },
  // });

  const filtered = MOCK_CUSTOMER_SESSIONS.filter(
    (s) => s.date >= params.startDate && s.date <= params.endDate,
  );

  return useFetchData<CustomerSession[]>({
    url: makeEndpoint("/api/customer/sessions/", params),
    querykey: [CUSTOMER_SESSIONS_QUERY_KEY, params],
    options: { enabled: false, initialData: filtered },
  });
}
