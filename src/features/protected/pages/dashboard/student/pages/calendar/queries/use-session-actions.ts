import { MY_PACKAGES_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/my-packages/queries/use-my-packages";
import { STUDENT_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/student/pages/overview/queries/use-student-dashboard";
import type {
  CancelSessionResponse,
  RescheduleSessionPayload,
  RescheduleSessionResponse,
} from "@/features/protected/pages/dashboard/student/types/student.types";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
import { toast } from "sonner";
import { STUDENT_SESSIONS_QUERY_KEY } from "./use-student-sessions";

/**
 * POST /student/sessions/:id/cancel/ — body nai.
 *
 * Cutoff (24 ghonta) er age cancel korle class package-e **ferot jay**
 * (`class_returned: true`), bhitore korle nosto hoy. Dui khetre-i slot
 * teacher-er calendar-e fire jay ar reminder cancel hoy.
 *
 * Shudhu `scheduled` class cancel kora jay — onno kichu hole 400.
 *
 * docs/bruno/student/cancel.bru
 */
export function useCancelSession(options?: {
  onSuccess?: (data: CancelSessionResponse) => void;
}) {
  return useMutationHandler<CancelSessionResponse, string>({
    mutationFn: (sessionId) =>
      request.post(`/student/sessions/${sessionId}/cancel/`, {}),
    // Class ferot ashte pare, tai package ar dashboard-o bashi hoye jay
    invalidateKeys: [
      [STUDENT_SESSIONS_QUERY_KEY],
      [MY_PACKAGES_QUERY_KEY],
      [STUDENT_DASHBOARD_QUERY_KEY],
    ],
    // Static message-er bodole backend-er nijer message dekhai — oita bole
    // class ferot elo naki nosto holo
    showSuccessToast: false,
    errorMessage: "Could not cancel this class.",
    debugLabel: "CancelSession",
    onSuccess: (data) => {
      toast(data.message, {
        position: "top-center",
        icon: data.class_returned ? "✅" : "⚠️",
      });
      options?.onSuccess?.(data);
    },
  });
}

type RescheduleVariables = {
  sessionId: string;
  payload: RescheduleSessionPayload;
};

/**
 * POST /student/sessions/:id/reschedule/
 *
 * Cutoff (24 ghonta) er age free; bhitore hole 400. Extra class **kate na** —
 * purono row `rescheduled` hoy ar notun ekta row `rescheduled_from` diye
 * purono tar dike point kore.
 *
 * docs/bruno/student/reschedule.bru
 */
export function useRescheduleSession(options?: {
  onSuccess?: (data: RescheduleSessionResponse) => void;
}) {
  return useMutationHandler<RescheduleSessionResponse, RescheduleVariables>({
    mutationFn: ({ sessionId, payload }) =>
      request.post(`/student/sessions/${sessionId}/reschedule/`, payload),
    // Extra class kate na, tai package invalidate korar dorkar nai
    invalidateKeys: [
      [STUDENT_SESSIONS_QUERY_KEY],
      [STUDENT_DASHBOARD_QUERY_KEY],
    ],
    showSuccessToast: false,
    errorMessage: "Could not move this class.",
    debugLabel: "RescheduleSession",
    onSuccess: (data) => {
      toast(data.message, { position: "top-center", icon: "✅" });
      options?.onSuccess?.(data);
    },
  });
}
