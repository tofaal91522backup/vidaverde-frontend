import type {
  PublicLanguage,
  PublicTestimonial,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_TESTIMONIALS_QUERY_KEY = "public-testimonials";

/** GET /public/testimonials/ — active testimonials, backend-er sorted order-e. */
export function usePublicTestimonials({ lang }: { lang: PublicLanguage }) {
  const query = { lang };

  return useFetchData<PublicTestimonial[]>({
    url: makeEndpoint("/public/testimonials/", query),
    querykey: [PUBLIC_TESTIMONIALS_QUERY_KEY, query],
    client: "public",
  });
}
