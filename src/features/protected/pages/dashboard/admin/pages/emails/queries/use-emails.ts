import type {
  AdminEmailsResponse,
  EmailStatus,
} from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const EMAILS_QUERY_KEY = "admin-emails";

type EmailListParams = {
  page?: number;
  status?: EmailStatus | "";
};

/**
 * GET /administrator/emails/ — email outbox. **Read-only**, paginated.
 *
 * Row gula `python manage.py send_due_emails` drain kore (cron proti 5 minute-e).
 * Ekta row 3 bar try korar por `failed` hoy ar karon `error` field-e thake.
 *
 * `cancelled` mane jar jonno email ta chhilo sheta-i ar nai — jemon reschedule
 * howa class-er purono reminder, ba unsubscribe kora lead-er baki nurture email.
 *
 * docs/bruno/administrator/emails.bru
 */
export function useEmails(params: EmailListParams = {}) {
  const query = { p: params.page, status: params.status || undefined };

  return useFetchData<AdminEmailsResponse>({
    url: makeEndpoint("/administrator/emails/", query),
    querykey: [EMAILS_QUERY_KEY, query],
  });
}
