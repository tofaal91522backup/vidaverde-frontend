import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PACKAGES_QUERY_KEY = "admin-packages";
export const PACKAGE_DETAILS_QUERY_KEY = "admin-package-details";

export type Package = {
  id: string;
  name: string;
  price: number;
  classesCount: number;
  validityDays: number;
  isActive: boolean;
};

type PackagesResponse = { results: Package[]; count: number };
type PackageParams = { page?: number; search?: string };

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const MOCK_PACKAGES: Package[] = [
  { id: "p1", name: "Assessment + First Lesson", price: 12, classesCount: 1, validityDays: 14, isActive: true },
  { id: "p2", name: "Starter Pack — 5 Classes", price: 55, classesCount: 5, validityDays: 60, isActive: true },
  { id: "p3", name: "Regular Pack — 10 Classes", price: 100, classesCount: 10, validityDays: 90, isActive: true },
  { id: "p4", name: "Intensive — 20 Classes", price: 180, classesCount: 20, validityDays: 120, isActive: true },
  { id: "p5", name: "Trial Lesson", price: 0, classesCount: 1, validityDays: 7, isActive: false },
];
// ─────────────────────────────────────────────────────────────────────────────

export function usePackages(params: PackageParams) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<PackagesResponse>({
  //   url: makeEndpoint("/api/packages/", params),
  //   querykey: [PACKAGES_QUERY_KEY, params],
  // });

  const filtered = params.search
    ? MOCK_PACKAGES.filter((p) =>
        p.name.toLowerCase().includes(params.search!.toLowerCase()),
      )
    : MOCK_PACKAGES;

  const page = params.page ?? 1;
  const paginated = filtered.slice((page - 1) * 10, page * 10);

  return useFetchData<PackagesResponse>({
    url: makeEndpoint("/api/packages/", params),
    querykey: [PACKAGES_QUERY_KEY, params],
    options: { enabled: false, initialData: { results: paginated, count: filtered.length } },
  });
}

export function usePackageDetails(id: string) {
  // ✅ REAL API — uncomment this and remove the demo block below:
  // return useFetchData<Package>({
  //   url: `/api/packages/${id}/`,
  //   querykey: [PACKAGE_DETAILS_QUERY_KEY, id],
  //   options: { enabled: !!id },
  // });

  const found = MOCK_PACKAGES.find((p) => p.id === id);
  return useFetchData<Package>({
    url: `/api/packages/${id}/`,
    querykey: [PACKAGE_DETAILS_QUERY_KEY, id],
    options: { enabled: false, initialData: found },
  });
}

export function useCreatePackage() {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.post("/api/packages/", data),
  // invalidateKeys: [[PACKAGES_QUERY_KEY]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Package created!",
    debugLabel: "CreatePackage",
  });
}

export function useUpdatePackage(_id: string) {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: (data) => request.put(`/api/packages/${_id}/`, data),
  // invalidateKeys: [[PACKAGES_QUERY_KEY], [PACKAGE_DETAILS_QUERY_KEY, _id]],
  return useMutationHandler<any, any>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Package updated!",
    debugLabel: "UpdatePackage",
  });
}

export function useTogglePackageStatus() {
  // ✅ REAL API — swap mutationFn and restore invalidateKeys:
  // mutationFn: ({ id, isActive }) => request.patch(`/api/packages/${id}/`, { isActive }),
  // invalidateKeys: [[PACKAGES_QUERY_KEY]],
  return useMutationHandler<any, { id: string; isActive: boolean }>({
    mutationFn: () => Promise.resolve(),
    successMessage: "Package status updated!",
    debugLabel: "TogglePackageStatus",
  });
}
