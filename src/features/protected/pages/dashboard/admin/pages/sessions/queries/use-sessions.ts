import { ADMIN_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/admin/pages/overview/queries/use-admin-dashboard";
import type {
  AdminSessionResponse,
  AdminSessionsResponse,
  SessionStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { keepPreviousData } from "@tanstack/react-query";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";

export const SESSIONS_QUERY_KEY = "admin-sessions";

/** `upcoming` — shobar age-erta age · `past` — notun ta age */
export type SessionFilter = "upcoming" | "past";

type SessionListParams = {
  filter?: SessionFilter;
  page?: number;
  /** Teacher UUID */
  teacher?: string;
  status?: SessionStatus | "";
  /** YYYY-MM-DD, class-er date-er upore */
  from?: string;
  to?: string;
};

/**
 * GET /administrator/sessions/ — puro school-er class, paginated.
 *
 * ⚠️ Ei endpoint-e **`search` param nai** — filter, teacher, status, from, to.
 * Student-er theke alada: response-e `start_local` nai, shob **school time**.
 *
 * docs/bruno/administrator/sessions.bru
 */
export function useSessions(params: SessionListParams = {}) {
  const query = {
    filter: params.filter,
    p: params.page,
    teacher: params.teacher || undefined,
    status: params.status || undefined,
    from: params.from || undefined,
    to: params.to || undefined,
  };

  return useFetchData<AdminSessionsResponse>({
    url: makeEndpoint("/administrator/sessions/", query),
    querykey: [SESSIONS_QUERY_KEY, query],
    // Tab ba filter bodlale purono row gula porde thake — na hole table-ta
    // unmount hoye spinner boshto (dekho use-students)
    options: { placeholderData: keepPreviousData },
  });
}

type UpdateSessionPayload = {
  id: string;
  status?: SessionStatus;
  admin_notes?: string;
};

/**
 * PATCH /administrator/sessions/:id/
 *
 * **Shudhu `status` ar `admin_notes` lekha jay.** Time ar teacher ichchhe kore
 * lock kora — class shorate hole reschedule endpoint diye jete hobe, jate
 * calendar event, class count ar reminder email shob mile thake.
 *
 * `completed` / `no_show` / `cancelled` korle queue-e thaka reminder cancel hoy.
 *
 * docs/bruno/administrator/session update.bru
 */
export function useUpdateSession() {
  return useMutationHandler<AdminSessionResponse, UpdateSessionPayload>({
    mutationFn: ({ id, ...data }) =>
      request.patch(`/administrator/sessions/${id}/`, data),
    invalidateKeys: [[SESSIONS_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Session updated.",
    errorMessage: "Could not update the session.",
    debugLabel: "UpdateSession",
  });
}
