import type {
  AdminAccount,
  AdminAccountResponse,
  AdminAccountsResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { request } from "@/lib/http/request";
import type { AdminAccountFormValues } from "../schemas/admin-account.schema";

export const ADMINS_QUERY_KEY = "admin-accounts";
export const ADMIN_DETAILS_QUERY_KEY = "admin-account-details";

/** Master admin only — backend also returns 403 for managers. */
export function useAdmins() {
  return useFetchData<AdminAccountsResponse>({
    url: "/administrator/admins/",
    querykey: [ADMINS_QUERY_KEY],
  });
}

export function useAdminDetails(id: string) {
  return useFetchData<AdminAccountResponse>({
    url: `/administrator/admins/${id}/`,
    querykey: [ADMIN_DETAILS_QUERY_KEY, id],
    options: { enabled: Boolean(id) },
  });
}

/** POST needs a password, but the returned `password_txt` is never rendered. */
export function useCreateAdmin() {
  return useMutationHandler<AdminAccountResponse, AdminAccountFormValues>({
    mutationFn: ({ email, name, password, role }) =>
      request.post("/administrator/admins/", { email, name, password, role }),
    invalidateKeys: [[ADMINS_QUERY_KEY]],
    successMessage: "Admin account created.",
    errorMessage: "Could not create the admin account.",
    // The response contains `password_txt`; do not write it to the console.
    debug: false,
    debugLabel: "CreateAdmin",
  });
}

/**
 * PATCH accepts `password_txt`, which also resets the actual password. The
 * password is only ever sent from this form; no existing password is displayed
 * or put into a default value.
 */
export function useUpdateAdmin(id: string) {
  return useMutationHandler<AdminAccountResponse, AdminAccountFormValues>({
    mutationFn: ({ email: _email, password, ...data }) =>
      request.patch(`/administrator/admins/${id}/`, {
        ...data,
        ...(password ? { password_txt: password } : {}),
      }),
    invalidateKeys: [[ADMINS_QUERY_KEY], [ADMIN_DETAILS_QUERY_KEY, id]],
    successMessage: "Admin account updated.",
    errorMessage: "Could not update the admin account.",
    // The response contains `password_txt`; do not write it to the console.
    debug: false,
    debugLabel: "UpdateAdmin",
  });
}

export function useDeactivateAdmin() {
  return useMutationHandler<AdminAccountResponse, { id: string }>({
    mutationFn: ({ id }) => request.delete(`/administrator/admins/${id}/`),
    invalidateKeys: [[ADMINS_QUERY_KEY]],
    successMessage: "Admin account deactivated.",
    errorMessage: "Could not deactivate the admin account.",
    debugLabel: "DeactivateAdmin",
  });
}
