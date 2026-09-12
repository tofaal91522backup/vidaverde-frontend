import type {
  PublicLanguage,
  PublicPackage,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";

export const PUBLIC_PACKAGES_QUERY_KEY = "public-packages";

type PublicPackagesParams = {
  lang: PublicLanguage;
};

/** GET /public/packages/ — active online-class packages, API sort order-e. */
export function usePublicPackages(params: PublicPackagesParams) {
  return useFetchData<PublicPackage[]>({
    url: makeEndpoint("/public/packages/", params),
    querykey: [PUBLIC_PACKAGES_QUERY_KEY, params],
    client: "public",
  });
}

export function orderPublicPackages(packages: PublicPackage[]) {
  return [...packages].sort((a, b) => a.sort_order - b.sort_order);
}
