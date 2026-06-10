import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const TEACHERS_QUERY_KEY = "admin-teachers";
export const TEACHER_DETAILS_QUERY_KEY = "admin-teacher-details";

export type Teacher = {
  id: string;
  name: string;
  bio: string;
  photo: string;
  specialisations: string[];
  isActive: boolean;
  schedule: Record<string, string[]>;
};

type TeachersResponse = { results: Teacher[]; count: number };
type TeacherParams = { page?: number; search?: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
// Remove this block and uncomment the real API lines below when backend is ready.

const MOCK_TEACHERS: Teacher[] = [
  {
    id: "t1",
    name: "María González",
    bio: "Experienced Spanish teacher with 8 years of online teaching. Specialises in business and professional Spanish for corporate clients.",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
    specialisations: ["Business Spanish", "Conversation Practice", "DELE Preparation"],
    isActive: true,
    schedule: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      tuesday: ["09:00", "10:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "11:00"],
      thursday: ["14:00", "15:00", "16:00"],
      friday: ["09:00", "10:00"],
    },
  },
  {
    id: "t2",
    name: "Carlos Rodríguez",
    bio: "Native Ecuadorian teacher with a degree in Hispanic Linguistics. Loves helping complete beginners build real confidence from day one.",
    photo: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200",
    specialisations: ["Beginner Courses", "Grammar Focus", "Travel Spanish"],
    isActive: true,
    schedule: {
      monday: ["10:00", "11:00"],
      tuesday: ["09:00", "10:00", "11:00", "15:00"],
      thursday: ["09:00", "10:00", "11:00"],
      friday: ["14:00", "15:00", "16:00", "17:00"],
      saturday: ["09:00", "10:00"],
    },
  },
  {
    id: "t3",
    name: "Ana Martínez",
    bio: "Cultural educator and language coach passionate about bringing Ecuador's rich culture into every lesson. Specialises in younger learners.",
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    specialisations: ["Cultural Immersion", "Children & Teens", "Conversation Practice"],
    isActive: false,
    schedule: {
      wednesday: ["14:00", "15:00", "16:00"],
      friday: ["10:00", "11:00"],
    },
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export function useTeachers(params: TeacherParams) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<TeachersResponse>({
  //   url: makeEndpoint("/api/teachers/", params),
  //   querykey: [TEACHERS_QUERY_KEY, params],
  // });

  const filtered = params.search
    ? MOCK_TEACHERS.filter((t) =>
        t.name.toLowerCase().includes(params.search!.toLowerCase()),
      )
    : MOCK_TEACHERS;
  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<TeachersResponse>({
    url: makeEndpoint("/api/teachers/", params),
    querykey: [TEACHERS_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}

export function useTeacherDetails(id: string) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<Teacher>({
  //   url: `/api/teachers/${id}/`,
  //   querykey: [TEACHER_DETAILS_QUERY_KEY, id],
  //   options: { enabled: !!id },
  // });

  const found = MOCK_TEACHERS.find((t) => t.id === id);
  return useFetchData<Teacher>({
    url: `/api/teachers/${id}/`,
    querykey: [TEACHER_DETAILS_QUERY_KEY, id],
    options: { enabled: false, initialData: found },
  });
}

export function useCreateTeacher() {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.post("/api/teachers/", data),
  // invalidateKeys: [[TEACHERS_QUERY_KEY]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Teacher created successfully!",
    debugLabel: "CreateTeacher",
  });
}

export function useUpdateTeacher(_id: string) {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.put(`/api/teachers/${_id}/`, data),
  // invalidateKeys: [[TEACHERS_QUERY_KEY], [TEACHER_DETAILS_QUERY_KEY, _id]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Teacher updated successfully!",
    debugLabel: "UpdateTeacher",
  });
}

export function useToggleTeacherStatus() {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: ({ id, isActive }) => request.patch(`/api/teachers/${id}/`, { isActive }),
  // invalidateKeys: [[TEACHERS_QUERY_KEY]],
  return useMutationHandler<any, { id: string; isActive: boolean }>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Teacher status updated!",
    debugLabel: "ToggleTeacherStatus",
  });
}
