import type {
  AdminCalendarResponse,
  SessionStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const CALENDAR_SESSIONS_QUERY_KEY = "admin-calendar-sessions";

type CalendarParams = {
  /** YYYY-MM-DD — **shob shomoy pathate hobe** */
  from: string;
  to: string;
  /** Teacher UUID */
  teacher?: string;
  status?: SessionStatus | "";
};

/**
 * GET /administrator/sessions/calendar/ — shob teacher-er shob class.
 *
 * Event gula calendar component je shape shoja khete pare shei shape-e ashe
 * (`id`, `title`, `start`, `end`, `color`)। **`color` backend-i dey** — fixed
 * palette theke teacher-er order onujayi, tai reload kore ba filter bodlaleo
 * ekta teacher-er rong ek-i thake.
 *
 * ⚠️ Date range na pathale backend **shob kichu** ferot dey — tai `from`/`to`
 * required kora hoyeche.
 *
 * docs/bruno/administrator/calendar.bru
 */
export function useCalendarSessions(params: CalendarParams) {
  const query = {
    from: params.from,
    to: params.to,
    teacher: params.teacher || undefined,
    status: params.status || undefined,
  };

  return useFetchData<AdminCalendarResponse>({
    url: makeEndpoint("/administrator/sessions/calendar/", query),
    querykey: [CALENDAR_SESSIONS_QUERY_KEY, query],
    options: { enabled: Boolean(params.from && params.to) },
  });
}
