import type {
  AdminStudentDetailResponse,
  AdminStudentsResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { keepPreviousData } from "@tanstack/react-query";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const STUDENTS_QUERY_KEY = "admin-students";
export const STUDENT_DETAILS_QUERY_KEY = "admin-student-details";

type StudentListParams = {
  page?: number;
  /** name ba email match kore */
  search?: string;
};

/**
 * GET /administrator/students/ — bhorti howa student, paginated.
 *
 * **Read-only** — admin student profile edit kore na.
 *
 * docs/bruno/administrator/students.bru
 */
export function useStudents(params: StudentListParams = {}) {
  const query = { p: params.page, search: params.search || undefined };

  return useFetchData<AdminStudentsResponse>({
    url: makeEndpoint("/administrator/students/", query),
    querykey: [STUDENTS_QUERY_KEY, query],
    // Search ba page bodlale purono row gula porde thake — table ta
    // unmount hoye spinner hoye jay na, tai laf-jhap kore na
    options: { placeholderData: keepPreviousData },
  });
}

/**
 * GET /administrator/students/:id/ — ek student-er puro chobi: profile, ja ja
 * package kineche, ar ja ja class hoyeche/book kora ache.
 *
 * ⚠️ Response shape bru te dekhano nai — `AdminStudentDetailResponse` er
 * comment dekho.
 */
export function useStudentDetails(id: string) {
  return useFetchData<AdminStudentDetailResponse>({
    url: `/administrator/students/${id}/`,
    querykey: [STUDENT_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}
