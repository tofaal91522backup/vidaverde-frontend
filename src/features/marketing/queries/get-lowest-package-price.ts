import type { PublicPackage } from "@/features/marketing/types/public-api.types";
import { makeEndpoint } from "@/lib/http/make-endpoint";
import { publicRequest } from "@/lib/http/request";

/**
 * Active package gular moddhe shobcheye kom dam, "$12" ba "$12.50" hisebe.
 * `/public/packages/` shudhu active package pathay. Kichu na thakle `null`.
 * Client hook (`useLowestPackagePrice`) ar server metadata — dui jaygay eki hishab.
 */
export function lowestPackagePrice(packages: PublicPackage[] | undefined) {
  const prices = (packages ?? [])
    .map((pkg) => Number(pkg.price))
    .filter((price) => Number.isFinite(price));
  if (!prices.length) return null;

  const lowest = Math.min(...prices);
  return `$${Number.isInteger(lowest) ? lowest : lowest.toFixed(2)}`;
}

/**
 * GET /public/packages/ — **server-side**, page metadata-r jonno.
 *
 * API na pele `null` — SEO description-er jonno page bhangar mane nai, tokhon
 * dam chhara description jay.
 */
export async function getLowestPackagePrice() {
  try {
    const packages = await publicRequest.get<PublicPackage[]>(
      makeEndpoint("/public/packages/", { lang: "en" }),
    );
    return lowestPackagePrice(packages);
  } catch {
    return null;
  }
}
