import { ADMIN_DASHBOARD_QUERY_KEY } from "@/features/protected/pages/dashboard/admin/pages/overview/queries/use-admin-dashboard";
import type {
  AdminContactMessageResponse,
  AdminContactMessagesResponse,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";

export const CONTACT_MESSAGES_QUERY_KEY = "admin-contact-messages";

type ContactListParams = {
  page?: number;
  /** `""` = shob, `true` = dekha hoyeche, `false` = baki */
  handled?: "true" | "false" | "";
  subject?: string;
};

/**
 * GET /administrator/contact-messages/ — visitor-er pathano enquiry, paginated.
 *
 * docs/bruno/administrator/contact messages.bru
 */
export function useContactMessages(params: ContactListParams = {}) {
  const query = {
    p: params.page,
    handled: params.handled || undefined,
    subject: params.subject || undefined,
  };

  return useFetchData<AdminContactMessagesResponse>({
    url: makeEndpoint("/administrator/contact-messages/", query),
    querykey: [CONTACT_MESSAGES_QUERY_KEY, query],
  });
}

type UpdateContactPayload = {
  id: string;
  /** true korle backend nijei `handled_at` stamp kore */
  handled?: boolean;
  admin_notes?: string;
};

/**
 * PATCH /administrator/contact-messages/:id/
 *
 * **Shudhu `handled` ar `admin_notes` lekha jay.** Visitor ja likhechilo sheta
 * ekta record — ichchhe kore read-only rakha, jate pore keu bodlate na pare.
 */
export function useUpdateContactMessage() {
  return useMutationHandler<AdminContactMessageResponse, UpdateContactPayload>({
    mutationFn: ({ id, ...data }) =>
      request.patch(`/administrator/contact-messages/${id}/`, data),
    // Dashboard-e `contact_unhandled` count ache, tai oita-o bashi hoye jay
    invalidateKeys: [[CONTACT_MESSAGES_QUERY_KEY], [ADMIN_DASHBOARD_QUERY_KEY]],
    successMessage: "Enquiry updated.",
    errorMessage: "Could not update the enquiry.",
    debugLabel: "UpdateContactMessage",
  });
}
