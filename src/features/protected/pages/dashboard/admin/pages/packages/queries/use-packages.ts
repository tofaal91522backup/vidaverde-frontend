import type {
  AdminPackage,
  AdminPackagesResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";

export const PACKAGES_QUERY_KEY = "admin-packages";
export const PACKAGE_DETAILS_QUERY_KEY = "admin-package-details";

/**
 * GET /administrator/packages/ — inactive gulo-o ashe (public endpoint oigula lukay).
 *
 * Doc bole **not paginated**, kintu list-er exact shape bru te dekhano nai —
 * tai `toList()` diye normalize kora hoy.
 *
 * docs/bruno/administrator/packages.bru
 */
export function usePackages() {
  return useFetchData<AdminPackagesResponse>({
    url: "/administrator/packages/",
    querykey: [PACKAGES_QUERY_KEY],
  });
}

/** GET /administrator/packages/:id/ — bare object */
export function usePackageDetails(id: string) {
  return useFetchData<AdminPackage>({
    url: `/administrator/packages/${id}/`,
    querykey: [PACKAGE_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}

type PackagePayload = Partial<
  Pick<
    AdminPackage,
    | "title_en"
    | "title_es"
    | "description_en"
    | "description_es"
    | "image_url"
    | "total_classes"
    | "validity_days"
    | "price"
    | "is_first_lesson"
    | "sort_order"
    | "active"
  >
>;

/** POST /administrator/packages/ — **bare object** ferot dey, envelope na */
export function useCreatePackage() {
  return useMutationHandler<AdminPackage, PackagePayload>({
    mutationFn: (data) => request.post("/administrator/packages/", data),
    invalidateKeys: [[PACKAGES_QUERY_KEY]],
    successMessage: "Package created.",
    errorMessage: "Could not create the package.",
    debugLabel: "CreatePackage",
  });
}

/** PATCH /administrator/packages/:id/ */
export function useUpdatePackage(id: string) {
  return useMutationHandler<AdminPackage, PackagePayload>({
    mutationFn: (data) => request.patch(`/administrator/packages/${id}/`, data),
    invalidateKeys: [
      [PACKAGES_QUERY_KEY],
      [PACKAGE_DETAILS_QUERY_KEY, id],
    ],
    successMessage: "Package updated.",
    errorMessage: "Could not update the package.",
    debugLabel: "UpdatePackage",
  });
}

/**
 * Active toggle — PATCH diye.
 *
 * Backend-e DELETE deactivate kore (purchase package ke `PROTECT` kore reference
 * kore; delete korle karo invoice history orphan hoye jeto). Activate korte-o
 * PATCH lage, tai duito dik-i PATCH.
 */
export function useTogglePackageStatus() {
  return useMutationHandler<AdminPackage, { id: string; active: boolean }>({
    mutationFn: ({ id, active }) =>
      request.patch(`/administrator/packages/${id}/`, { active }),
    invalidateKeys: [[PACKAGES_QUERY_KEY]],
    successMessage: "Package status updated.",
    errorMessage: "Could not update the package status.",
    debugLabel: "TogglePackageStatus",
  });
}
