import type {
  PublicLanguage,
  PublicPackage,
} from "@/features/marketing/types/public-api.types";
import { useFetchData } from "@/hooks/use-fetch-data";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { useMemo } from "react";

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

/**
 * Package-er Spanish admin na likhle `?lang=es` English pathay; tokhon
 * `translate="no"` dile ES-e English-i theke jeto. English-er shathe mile —
 * `true` mane school-er nijer Spanish, Google-er hat theke bachate hobe.
 * EN-e eki query, alada request na. Pricing, booking, teacher profile.
 */
export function useOwnPackageCopy() {
  const { data: english } = usePublicPackages({ lang: "en" });
  return useMemo(() => {
    const byId = new Map(english?.map((pkg) => [pkg.id, pkg]));
    return (
      pkg: Pick<PublicPackage, "id" | "title" | "description"> | null,
      field: "title" | "description",
    ) => !!pkg && pkg[field] !== byId.get(pkg.id)?.[field];
  }, [english]);
}
