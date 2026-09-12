import type { AdminEmailsResponse, EmailStatus } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const EMAILS_QUERY_KEY = "admin-emails";

export type EmailListParams = {
  page?: number;
  status?: EmailStatus | "";
};

/**
 * GET /administrator/emails/ — queued, sent, failed, and cancelled email-er
 * read-only outbox. `failed` row-te backend-er last delivery error thake.
 *
 * docs/bruno/administrator/emails.bru
 */
export function useEmails(params: EmailListParams = {}) {
  const query = {
    p: params.page,
    status: params.status || undefined,
  };

  return useFetchData<AdminEmailsResponse>({
    url: makeEndpoint("/administrator/emails/", query),
    querykey: [EMAILS_QUERY_KEY, query],
  });
}
