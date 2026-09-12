import { MY_PACKAGES_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/my-packages/queries/use-my-packages";
import { STUDENT_SESSIONS_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/calendar/queries/use-student-sessions";
import { STUDENT_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/overview/queries/use-student-dashboard";
import type {
  BookSessionPayload,
  BookSessionResponse,
} from "@/features/protected/pages/dashboard/student/types/student.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";

/**
 * POST /student/sessions/ — package-e baki thaka ekta class book kore.
 *
 * 10/20-class package-er class 2..N ei bhabe ek ek kore boshe, ek shathe na.
 * Ekta class kate, calendar event + Meet link banay, email pathay, ar 24h
 * reminder queue kore.
 *
 * Package shesh/expired/unpaid hole ba slot khali na thakle 400.
 *
 * docs/bruno/student/book session.bru
 */
export function useBookSession(options?: {
  onSuccess?: (data: BookSessionResponse) => void;
}) {
  return useMutationHandler<BookSessionResponse, BookSessionPayload>({
    mutationFn: (payload) => request.post("/student/sessions/", payload),
    // Ekta class kate, tai package-o bashi hoye jay
    invalidateKeys: [
      [STUDENT_SESSIONS_QUERY_KEY],
      [MY_PACKAGES_QUERY_KEY],
      [STUDENT_DASHBOARD_QUERY_KEY],
    ],
    successMessage: "Your class is booked. Check your email for the details.",
    errorMessage: "Could not book this class.",
    debugLabel: "BookSession",
    onSuccess: (data) => options?.onSuccess?.(data),
  });
}
