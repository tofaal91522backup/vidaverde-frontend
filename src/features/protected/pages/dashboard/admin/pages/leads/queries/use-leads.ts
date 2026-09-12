import type { AdminLeadsResponse } from "@/features/protected/pages/dashboard/admin/types/admin.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { useMutationHandler } from "@/hooks/use-mutation-handler";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { request } from "@/lib/http/request";
import { dateStamp, saveBlob } from "@/utils/save-blob";

export const LEADS_QUERY_KEY = "admin-leads";

export type LeadListParams = {
  page?: number;
  /** `"true"` = jara unsubscribe kore nai */
  subscribed?: "true" | "";
  /** `"true"` = jara pore booking kore feleche */
  converted?: "true" | "";
  /** Email-er ongsho */
  search?: string;
};

/**
 * GET /administrator/leads/ — jara free guide download koreche, paginated.
 *
 * **Read-only** — admin lead edit ba delete kore na.
 *
 * `nurture_stage` bole queued sequence koto dur gelo; 4 mane tinta follow-up-i
 * schedule hoye geche.
 *
 * docs/bruno/administrator/leads.bru
 */
export function useLeads(params: LeadListParams = {}) {
  const query = {
    p: params.page,
    subscribed: params.subscribed || undefined,
    converted: params.converted || undefined,
    search: params.search || undefined,
  };

  return useFetchData<AdminLeadsResponse>({
    url: makeEndpoint("/administrator/leads/", query),
    querykey: [LEADS_QUERY_KEY, query],
  });
}

/**
 * GET /administrator/leads/export/ — CSV download.
 *
 * ⚠️ **Ei export kono filter-i mane na — shob shomoy PURO lead list dey.**
 * Backend source-e verify kora (`administrator/views/funnel.py` →
 * `LeadExportView`): query param porei na, shoja `Lead.objects.iterator()`
 * chalay. Bookings export at least `payment_status`/`from`/`to` mane, eta kichu-i na.
 *
 * Tai ekhane ichchhe kore **kono param pathano hoy na** — pathale mone hoto
 * filter kaj korche. UI te admin ke sposhto bola hoy je puro list namche.
 *
 * CSV column: Captured · First name · Email · Source · Subscribed · Converted
 */
export function useExportLeads() {
  return useMutationHandler<Blob, void>({
    mutationFn: async () => {
      const blob = await request.getBlob("/administrator/leads/export/");
      saveBlob(blob, `vidaverde-leads-${dateStamp()}.csv`);
      return blob;
    },
    showSuccessToast: false,
    errorMessage: "Could not export the leads.",
    debugLabel: "ExportLeads",
  });
}
