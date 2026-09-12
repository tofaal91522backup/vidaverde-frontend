import { ADMIN_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/admin/pages/overview/queries/use-admin-dashboard";
import type {
  AdminTeacher,
  AdminTeacherResponse,
  AdminTeachersResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";

export const TEACHERS_QUERY_KEY = "admin-teachers";
export const TEACHER_DETAILS_QUERY_KEY = "admin-teacher-details";

type TeacherListParams = {
  /** name / institute er upore match kore */
  search?: string;
  active?: boolean;
};

/**
 * GET /administrator/teachers/
 *
 * ⚠️ List response-er shape bru te dekhano nai — bare array naki
 * `{ success, results }` ta nishchit na. Tai `toList()` diye normalize kora hoy.
 * Pagination-er kono ullekh-o nai, tai `<Pagination>` boshano hoy ni.
 *
 * docs/bruno/administrator/teachers.bru
 */
export function useTeachers(params: TeacherListParams = {}) {
  const query = { search: params.search, active: params.active };

  return useFetchData<AdminTeachersResponse>({
    url: makeEndpoint("/administrator/teachers/", query),
    querykey: [TEACHERS_QUERY_KEY, query],
  });
}

/** GET /administrator/teachers/:id/ — response-e `time_off` embed thake */
export function useTeacherDetails(id: string) {
  return useFetchData<AdminTeacherResponse>({
    url: `/administrator/teachers/${id}/`,
    querykey: [TEACHER_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}

type TeacherPayload = Partial<
  Pick<
    AdminTeacher,
    | "name"
    | "profile_img_url"
    | "tags"
    | "institute"
    | "description_en"
    | "description_es"
    | "availability"
    | "accepting_students"
    | "google_calendar_id"
    | "meet_link"
    | "active"
  >
>;

/** POST /administrator/teachers/ */
export function useCreateTeacher() {
  return useMutationHandler<AdminTeacherResponse, TeacherPayload>({
    mutationFn: (data) => request.post("/administrator/teachers/", data),
    invalidateKeys: [[TEACHERS_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Teacher created.",
    errorMessage: "Could not create the teacher.",
    debugLabel: "CreateTeacher",
  });
}

/** PATCH /administrator/teachers/:id/ */
export function useUpdateTeacher(id: string) {
  return useMutationHandler<AdminTeacherResponse, TeacherPayload>({
    mutationFn: (data) => request.patch(`/administrator/teachers/${id}/`, data),
    invalidateKeys: [
      [TEACHERS_QUERY_KEY],
      [TEACHER_DETAILS_QUERY_KEY, id],
      [ADMIN_DASHBOARD_QUERY_KEY],
    ],
    successMessage: "Teacher updated.",
    errorMessage: "Could not update the teacher.",
    debugLabel: "UpdateTeacher",
  });
}

/**
 * Active toggle — PATCH diye, DELETE diye na.
 *
 * Backend-e DELETE `active` ar `accepting_students` duito-i false kore dey ar
 * row rakhe (session teacher ke PROTECT diye reference kore). Kintu abar
 * activate korar jonno PATCH-i lage, tai duita khetrei PATCH use kora hoy —
 * behaviour ek rokom thake.
 */
export function useToggleTeacherStatus() {
  return useMutationHandler<
    AdminTeacherResponse,
    { id: string; active: boolean }
  >({
    mutationFn: ({ id, active }) =>
      request.patch(`/administrator/teachers/${id}/`, {
        active,
        // Backend delete korar shomoy ei duito-i namay — deactivate-e mil rakha hocche
        ...(active ? {} : { accepting_students: false }),
      }),
    invalidateKeys: [[TEACHERS_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Teacher status updated.",
    errorMessage: "Could not update the teacher status.",
    debugLabel: "ToggleTeacherStatus",
  });
}
