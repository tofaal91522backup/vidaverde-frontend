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
 * GET /administrator/leads/export/ — ek-i list CSV hisebe.
 *
 * ⚠️ Doc shudhu bole "downloads the same list as CSV" — **kon filter gula mane
 * sheta bola nai** (bookings export-e teacher/search ignore kore). Ekhane list-er
 * filter gula pathano hoy, kintu asol API cholle verify kora dorkar.
 *
 * docs/bruno/administrator/bookings export.bru (leads-er ta ekhane ullekh kora)
 */
export function useExportLeads() {
  return useMutationHandler<Blob, Omit<LeadListParams, "page">>({
    mutationFn: async (params) => {
      const blob = await request.getBlob(
        makeEndpoint("/administrator/leads/export/", {
          subscribed: params.subscribed || undefined,
          converted: params.converted || undefined,
          search: params.search || undefined,
        }),
      );
      saveBlob(blob, `vidaverde-leads-${dateStamp()}.csv`);
      return blob;
    },
    showSuccessToast: false,
    errorMessage: "Could not export the leads.",
    debugLabel: "ExportLeads",
  });
}
