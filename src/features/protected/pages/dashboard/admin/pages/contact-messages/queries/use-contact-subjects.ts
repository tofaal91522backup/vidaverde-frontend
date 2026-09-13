import type { PublicContactSubjectsResponse } from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";

export const CONTACT_SUBJECTS_QUERY_KEY = "admin-contact-subjects";

/**
 * GET /public/contact/subjects/ — valid `subject` value + display label.
 *
 * Admin-er enquiry filter ei enum-i ney (`contact messages.bru`: *"subject
 * (`online_classes`, …)"*). Age ekhane free-text input chilo ar comment-e lekha
 * chilo "valid value gula documented na" — **seta purono**; endpoint-ta ache ar
 * public contact form already eta use kore.
 *
 * Marketing-er `useContactSubjects` er shathe ek-i endpoint. Hook ta duplicate
 * kora hoyeche kintu **type share kora** — student portal-er
 * `use-package-teachers.ts` e ek-i shidhanto: runtime hook feature-er nijer,
 * backend contract-er type ek jaygay.
 */
export function useContactSubjects() {
  return useFetchData<PublicContactSubjectsResponse>({
    url: "/public/contact/subjects/",
    querykey: [CONTACT_SUBJECTS_QUERY_KEY],
  });
}
